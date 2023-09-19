import { createBindCollection, deleteCollection } from './collection';
import { importBigSet } from './import-big';

const runBigLoad = async () => {
  const collectionName = "BigSet";
  // await deleteCollection(collectionName);
  await createBindCollection(collectionName);
  await importBigSet(collectionName);
}

runBigLoad();
