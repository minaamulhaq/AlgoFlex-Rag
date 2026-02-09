import { Key } from "../models/key.model.js";
import OpenAI from "openai";
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';
export const chatController = async (req, res) => {

    try {
        const userQuery = req.query.query;
        const fileName = req.query.fileName;
        const { userId } = req.auth();
        if (!userQuery || typeof userQuery !== "string")
            return res.status(400).json({ message: "Query must be a string" });
        // get key froma database

        const key = await Key.findOne({ userId });
        if (!key) {
            return res.status(202).json({ answer: "API Key not found. Please set your OpenAI API key in the profile settings." });
        }





        console.log("Received chat request:", { userId, userQuery, fileName });
        if (!userId) {
            return res.status(401).json({ answer: "Unauthorized" });
        }
        if (!userQuery || typeof userQuery !== "string") {
            return res.status(400).json({ answer: "Query must be a string" });
        }
        const client = new OpenAI({
            apiKey: key.openaiAPIKey,
        });
        const embeddings = new OpenAIEmbeddings({
            model: "text-embedding-3-large",
            apiKey: key.openaiAPIKey,
        });

        let vectorStore;
        try {
            vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
                url: process.env.QDRANT_URL || "http://localhost:6333",
                collectionName: fileName,
            });
        } catch (err) {
            return res.status(404).json({ answer: "Document collection not found" });
        }


        const results = await vectorStore.similaritySearch(userQuery, 10);

        const SYSTEM_PROMPT = `You are a helpful AI assistant. Use the following context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.
    ${results}`;

        const response = await client.responses.create({
            model: "gpt-4o",
            input: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userQuery },
            ]
        });
        console.log(response.output_text);
        res.json({ answer: response.output_text });
    } catch (error) {
        console.error("Error handling chat request:", error);
        res.status(500).json({ message: "Internal server error" });
    }


}