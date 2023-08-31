import { createBindCollection, deleteCollection } from './collection';
import { importMediaFiles } from './import';

const collectionName = 'BindExample';

const run = async () => {
  // await deleteCollection(collectionName);
  await createBindCollection(collectionName);
  await importMediaFiles(collectionName);
}

run();


