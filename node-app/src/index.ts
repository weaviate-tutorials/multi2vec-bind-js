import { createBindCollection, deleteCollection } from './collection';
import { importMediaFiles } from './import';

const run = async () => {
  const collectionName = "BindExample";
  // await deleteCollection(collectionName);
  await createBindCollection(collectionName);
  await importMediaFiles(collectionName);
}

run();
