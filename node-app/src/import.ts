import { ObjectsBatcher, WeaviateClient, generateUuid5 } from 'weaviate-ts-client';
import { getWeaviateClient } from './client';
import { FileInfo, getBase64, listFiles } from './util';



// const sourceImages = 'source/input_images/';
// const sourceAudio = 'source/audio/';
// const sourceVideo = 'source/video/';
const sourceBase = '../web-app/src/assets';
const sourceImages = sourceBase + '/image/'
const sourceAudio = sourceBase + '/audio/';
const sourceVideo = sourceBase + '/video/';

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

    const files = listFiles(sourceImages);
    console.log(`Importing ${files.length} images.`)

    for (const file of files) {
        const item = {
            name: file.name,
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
        // const res = await batcher.do();
        // console.log(res);
    }
}


const insertAudio = async (collectionName: string) => {
    let batcher: ObjectsBatcher = client.batch.objectsBatcher();
    let counter = 0;
    const batchSize = 3;

    const files = listFiles(sourceAudio);
    console.log(`Importing ${files.length} audio files.`)

    for (const file of files) {
        const item = {
            name: file.name,
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

    const files = listFiles(sourceVideo);
    console.log(`Importing ${files.length} video files.`)

    for (const file of files) {
        const item = {
            name: file.name,
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
