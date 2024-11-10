import { BlobServiceClient } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity';
import { ImagePicker } from 'react-native-image-picker';
import fs from 'fs';
import path from 'path';
require("dotenv").config();

const credential = new DefaultAzureCredential();
const account_name = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const blobServiceClient = new BlobServiceClient(`https://${account_name}.blob.core.windows.net`, credential);
const containerName = "timebank-images";
const containerClient = blobServiceClient.getContainerClient(containerName);

async function deleteBlob(blobName) {
    const options = { deleteSnapshots: 'include' };
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.delete(options);
}

async function streamToText(readable) {
    readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) { data += chunk; }
    return data;
}

export async function uploadImage(fileName, blobName) {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const filePath = path.join(__dirname, 'images', fileName);
    const fileStream = fs.createReadStream(filePath);
    const fileStats = fs.statSync(filePath);
    const uploadBlobResponse = await blockBlobClient.uploadStream(fileStream, fileStats.size);
    console.log(`Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`);
}

export async function getImage(name) {
    return containerClient.getBlockBlobClient(name).url;
}

export async function getImageList() {
    let result = [];
    for await (const blob of containerClient.listBlobsFlat()) {
        const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
        result.push({ [blob.name]: tempBlockBlobClient.url });
    }
    return result;
}

export async function DownloadImage(blobName) {
    try {
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const downloadBlockBlobResponse = await blockBlobClient.download(0);
        const readableStream = downloadBlockBlobResponse.readableStreamBody;

        const imagesDir = path.join(__dirname, 'images');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir);
        }

        const filePath = path.join(imagesDir, blobName);
        const writableStream = fs.createWriteStream(filePath);

        readableStream.pipe(writableStream);

        writableStream.on('finish', () => {
            console.log(`Downloaded blob content saved to ${filePath}`);
        });

        writableStream.on('error', (err) => {
            console.error(`Error writing to file: ${err.message}`);
        });
    } catch (err) {
        console.error(err.message);
    }
}

export async function deleteImage(name) {
    const options = { deleteSnapshots: 'include' };
    const blockBlobClient = containerClient.getBlockBlobClient(name);
    await blockBlobClient.delete(options);
}
