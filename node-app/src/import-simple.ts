import { WeaviateClient, generateUuid5 } from 'weaviate-ts-client';
import { getWeaviateClient } from './client';
import { getBase64, listFiles } from './util';

const client: WeaviateClient = getWeaviateClient();

const sourceBase = '../web-app/src/';
const imagePath = `assets/image/`;
const audioPath = `assets/audio/`;
const videoPath = `assets/video/`;

export const importFiles = async (collectionName: string) => {
    await insertImages(collectionName);
    await insertAudio(collectionName);
    await insertVideo(collectionName);
}

const insertImages = async (collectionName: string) => {
    const files = listFiles(sourceBase+imagePath);
    console.log(`Importing ${files.length} images.`)

    for (const file of files) {
        const item = {
            name: file.name,
            url: imagePath+file.name,
            image: getBase64(file.path),
            type: 'image'
        };
        
        console.log(`Adding [${item.type}]: ${item.name}`);

        await client.data
            .creator()
            .withClassName(collectionName)
            .withProperties(item)
            .withId(generateUuid5(file.name))
            .do();
    }
}

const insertAudio = async (collectionName: string) => {
    const files = listFiles(sourceBase+audioPath);
    console.log(`Importing ${files.length} audio files.`)

    for (const file of files) {
        const item = {
            name: file.name,
            url: audioPath+file.name,
            audio: getBase64(file.path),
            type: 'audio'
        };

        console.log(`Adding [${item.type}]: ${item.name}`);
        
        await client.data
            .creator()
            .withClassName(collectionName)
            .withProperties(item)
            .withId(generateUuid5(file.name))
            .do();
    }
}

const insertVideo = async (collectionName: string) => {
    const files = listFiles(sourceBase+videoPath);
    console.log(`Importing ${files.length} video files.`)

    for (const file of files) {
        const item = {
            name: file.name,
            url: videoPath+file.name,
            video: getBase64(file.path),
            type: 'video'
        };

        console.log(`Adding [${item.type}]: ${item.name}`);
        
        await client.data
            .creator()
            .withClassName(collectionName)
            .withProperties(item)
            .withId(generateUuid5(file.name))
            .do();
    }
}
