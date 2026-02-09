import { Webhook } from "svix";
import User from "../models/user.js";
import { ApiResponse } from "../utils/Helper.js";

const CreateUser = async (req, res) => {
    try {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.error("❌ CLERK_WEBHOOK_SECRET is missing");
            return res.status(500).json({ message: "Webhook secret not configured" });
        }

        // 1. Get the raw payload (req.body is a Buffer if using express.raw)
        const payload = req.body.toString();

        // 2. Extract Svix headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // 3. Verify the webhook
        const wh = new Webhook(webhookSecret);
        let event;

        try {
            event = wh.verify(payload, headers);
        } catch (err) {
            console.error("❌ Webhook verification failed:", err.message);
            return res.status(400).json({ message: "Invalid signature" });
        }

        // 4. Process the "user.created" event
        if (event.type === "user.created") {
            const { id, email_addresses, first_name, last_name, image_url } = event.data;

            const existingUser = await User.findOne({ email: email_addresses[0]?.email_address });

            if (existingUser) {
                return res.status(200).json({ message: "User already exists" });
            }

            const newUser = new User({
                clerkId: id,
                email: email_addresses[0]?.email_address || "",
                firstName: first_name || "",
                lastName: last_name || "",
                imageUrl: image_url || "",
                role: "user",
            });

            await newUser.save();
            console.log("✅ New user created:", newUser.email);

            return res.status(201).json(
                new ApiResponse(201, newUser, "User created successfully")
            );
        }

        // Handle other event types or just acknowledge receipt
        return res.status(200).json({ message: "Event received" });

    } catch (error) {
        console.error("Error processing webhook:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export default CreateUser;