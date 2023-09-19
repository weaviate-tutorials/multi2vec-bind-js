import { ObjectsBatcher, WeaviateClient, generateUuid5 } from 'weaviate-ts-client';
import { getWeaviateClient } from './client';
import { getBase64, listFiles } from './util';

const sourceBase = '../web-app/src/';
const imagePath = `assets/image/`;
const audioPath = `assets/audio/`;
const videoPath = `assets/video/`;

const client: WeaviateClient = getWeaviateClient();

export const importMediaFiles = async (collectionName: string) => {
    await insertImages(collectionName);
    await insertAudio(collectionName);
    await insertVideo(collectionName);
}

const insertImages = async (collectionName: string) => {
    let batcher: ObjectsBatcher = client.batch.objectsBatcher();
    let counter = 0;
    const batchSize = 5;

    const files = listFiles(sourceBase+imagePath);
    console.log(`Importing ${files.length} images.`)

    for (const file of files) {
        const item = {
            name: file.name,
            url: imagePath+file.name,
            image: getBase64(file.path),
            media: 'image'
        };
        
        console.log(`Adding [${item.media}]: ${item.name}`);

        batcher = batcher.withObject({
            class: collectionName,
            properties: item,
            id: generateUuid5(file.name)
        });

        if (++counter == batchSize) {
            console.log(`Flushing ${counter} items.`)

            // flush the batch queue
            await batcher.do();
      
            // restart the batch queue
            counter = 0;
            batcher = client.batch.objectsBatcher();
        }
    }

    if (counter > 0) {
        console.log(`Flushing remaining ${counter} item(s).`)
        await batcher.do();
    }
}


const insertAudio = async (collectionName: string) => {
    let batcher: ObjectsBatcher = client.batch.objectsBatcher();
    let counter = 0;
    const batchSize = 3;

    const files = listFiles(sourceBase+audioPath);
    console.log(`Importing ${files.length} audio files.`)

    for (const file of files) {
        const item = {
            name: file.name,
            url: audioPath+file.name,
            audio: getBase64(file.path),
            media: 'audio'
        };

        console.log(`Adding [${item.media}]: ${item.name}`);
        
        batcher = batcher.withObject({
            class: collectionName,
            properties: item,
            id: generateUuid5(file.name)
        });

        if (++counter == batchSize) {
            console.log(`Flushing ${counter} items.`)
            // flush the batch queue
            await batcher.do();
      
            // restart the batch queue
            counter = 0;
            batcher = client.batch.objectsBatcher();
        }
    }

    if (counter > 0) {
        console.log(`Flushing remaining ${counter} item(s).`)
        await batcher.do();
    }
}

const insertVideo = async (collectionName: string) => {
    let batcher: ObjectsBatcher = client.batch.objectsBatcher();
    let counter = 0;
    const batchSize = 1;

    const files = listFiles(sourceBase+videoPath);
    console.log(`Importing ${files.length} video files.`)

    for (const file of files) {
        const item = {
            name: file.name,
            url: videoPath+file.name,
            video: getBase64(file.path),
            media: 'video'
        };

        console.log(`Adding [${item.media}]: ${item.name}`);
        
        batcher = batcher.withObject({
            class: collectionName,
            properties: item,
            id: generateUuid5(file.name)
        });

        if (++counter == batchSize) {
            console.log(`Flushing ${counter} items.`)
            // flush the batch queue
            await batcher.do();
      
            // restart the batch queue
            counter = 0;
            batcher = client.batch.objectsBatcher();
        }
    }

    if (counter > 0) {
        console.log(`Flushing remaining ${counter} item(s).`)
        await batcher.do();
    }
}
