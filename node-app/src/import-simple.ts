import { ObjectsBatcher, WeaviateClient, generateUuid5 } from 'weaviate-ts-client';
import { getWeaviateClient } from './client';
import { FileInfo, getBase64, listFiles } from './util';

const client: WeaviateClient = getWeaviateClient();

const sourceBase = '../web-app/src/assets';
const sourceImages = sourceBase + '/image/'
const sourceAudio = sourceBase + '/audio/';
const sourceVideo = sourceBase + '/video/';

export const importFiles = async (collectionName: string) => {
    await insertImages(collectionName);
    await insertAudio(collectionName);
    await insertVideo(collectionName);
}

const insertImages = async (collectionName: string) => {
    const files = listFiles(sourceImages);
    console.log(`Importing ${files.length} images.`)

    for (const file of files) {
        const item = {
            name: file.name,
            image: getBase64(file.path),
            type: 'image'
        };
        
        console.log(`Adding [${item.type}]: ${item.name}`);

        let result = await client.data
            .creator()
            .withClassName(collectionName)
            .withProperties(item)
            .withId(generateUuid5(file.name))
            .do();

        // console.log(result);  // the returned value is the object        
    }
}

const insertAudio = async (collectionName: string) => {
    const files = listFiles(sourceAudio);
    console.log(`Importing ${files.length} audio files.`)

    for (const file of files) {
        const item = {
            name: file.name,
            audio: getBase64(file.path),
            type: 'audio'
        };

        console.log(`Adding [${item.type}]: ${item.name}`);
        
        let result = await client.data
            .creator()
            .withClassName(collectionName)
            .withProperties(item)
            .withId(generateUuid5(file.name))
            .do();
    }
}

const insertVideo = async (collectionName: string) => {
    const files = listFiles(sourceVideo);
    console.log(`Importing ${files.length} video files.`)

    for (const file of files) {
        const item = {
            name: file.name,
            video: getBase64(file.path),
            type: 'video'
        };

        console.log(`Adding [${item.type}]: ${item.name}`);
        
        let result = await client.data
            .creator()
            .withClassName(collectionName)
            .withProperties(item)
            .withId(generateUuid5(file.name))
            .do();

        // console.log(JSON.stringify(result, null, 2));  // the returned value is the object        
    }
}
