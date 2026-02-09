import { tryCatch, Worker } from 'bullmq';
import { QdrantVectorStore } from "@langchain/qdrant";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import 'dotenv/config';
import fs from 'fs/promises';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


console.log("Worker started, waiting for jobs...");
const worker = new Worker('fileuploadQueue', async (job) => {

    // read the job data
    // read the patyh from path 
    //chunks the pdf 
    //call the openai embeding model for each chunk 
    //store the embeddings in quadrant db

    //load  the pdf 
    try {
        const loader = new PDFLoader(job.data.filePath, {
            splitPages: false,
        });

        const docs = await loader.load();

        //split the pdf into chunks
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 300,
        });
        const chunks = await textSplitter.splitDocuments(docs);


        //create embeddings
        const embeddings = new OpenAIEmbeddings({
            model: "text-embedding-3-large",
            apiKey: job.data.openaiAPIKey,
        });
        const safeCollection = job.data.fileName.replace(/[^a-zA-Z0-9_-]/g, "_");
        const vectorStore = await QdrantVectorStore.fromDocuments(chunks, embeddings, {
            url: process.env.QDRANT_URL || "http://localhost:6333",
            collectionName: safeCollection,
        });
        // await vectorStore.addDocuments(chunks);

        console.log(`Job ${job.id} completed: Processed file ${job.data.fileName}`);
    } catch (error) {
        console.error(`Error processing job ${job.id}:`, error);
    }
}, {

    lockDuration: 60000, // Increased to 60 seconds (1 minute) to give OpenAI time to respond.
    lockRenewTime: 20000,
    concurrency: 3,
    connection: {
        host: '127.0.0.1',
        port: 6379
    }
});
worker.on('completed', async (job) => {
    console.log(`Job ${job.id} has been completed!`);
    // delete the uploaded file after processing
    await fs.unlink(job.data.filePath);

    // Optionally, you can remove the job from the queue after completion

    job.remove();

});
worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed:`, err.message);
});
