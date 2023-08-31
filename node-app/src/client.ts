import weaviate, { WeaviateClient } from 'weaviate-ts-client';

let client: WeaviateClient;

export const getWeaviateClient = () => {
  if (!client) {
    client = weaviate.client({
      scheme: 'http',
      host: 'localhost:8080',
    });
  };
  
  // client.misc.readyChecker().do().then(console.log)
  return client;
}