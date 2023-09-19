import { ObjectsBatcher, WeaviateClient, generateUuid5 } from 'weaviate-ts-client';
import { getWeaviateClient } from './client';
import { getBase64, listFiles } from './util';

const client: WeaviateClient = getWeaviateClient();

const sourceBase = '../web-app/src/';
// const imagePath = `assets/bigset/image/0/`
// const imagePath = `assets/bigset/image/1/`
const imagePath = `assets/bigset/image/2/`

export const importBigSet = async (collectionName: string) => {
    await insertImages(collectionName);
}

const insertImages = async (collectionName: string) => {
    let batcher: ObjectsBatcher = client.batch.objectsBatcher();
    let counter = 0;
    let batchCounter = 0;
    const batchSize = 10;

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
            console.log(`Flushing batch #${batchCounter++}.`)

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
