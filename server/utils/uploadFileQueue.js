import { Queue } from "bullmq";

export const queue = new Queue("fileuploadQueue", {
    connection: {
        host: '127.0.0.1',
        port: 6379
    }
});