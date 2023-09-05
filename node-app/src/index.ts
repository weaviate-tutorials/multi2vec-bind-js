import { createBindCollection, deleteCollection } from './collection';
import { importMediaFiles } from './import';

const collectionName = 'BindExample';

const run = async () => {
  // await deleteCollection(collectionName);
  await createBindCollection(collectionName);
  await importMediaFiles(collectionName);
  console.log("######################")
  console.log("######################")
  console.log("All set! You can now browse to http://localhost:4200")
  console.log("######################")
  console.log("######################")
  
}

run();


