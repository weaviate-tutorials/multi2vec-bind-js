import { Injectable } from '@angular/core';
import weaviate, { WeaviateClient } from 'weaviate-ts-client';
import { Base64Service } from './base64.service';
import { Item } from './weaviate.service';

@Injectable({
  providedIn: 'root'
})
export class WeaviateBigService {
  private client: WeaviateClient;

  constructor(private base64: Base64Service) {
    this.client = weaviate.client({
      scheme: 'http',
      host: 'localhost:8080',
    });
  }

  async textSearch(query: string): Promise<Item[]> {
    const response = await this.client.graphql
    .get()
    .withClassName('BigSet')
    .withFields('name media, url, _additional {certainty} ')
    .withNearText({concepts: [query]})
    .withLimit(12)
    .do();

    return this.parseResponse(response);
  }

  async imageSearch(file: File): Promise<Item[]> {
    const base64 = await this.base64.toBase64FromFile(file);

    const response = await this.client.graphql
      .get()
      .withClassName('BigSet')
      .withFields('name, media, url, _additional {certainty} ')
      .withNearImage({image: base64})
      .withLimit(12)
      .do()
      
    return this.parseResponse(response);
  }

  async audioSearch(file: File): Promise<Item[]> {
    const base64 = await this.base64.toBase64FromFile(file);

    const response = await this.client.graphql
      .get()
      .withClassName('BigSet')
      .withFields('name, media, url, _additional {certainty} ')
      .withNearAudio({audio: base64})
      .withLimit(12)
      .do()

    return this.parseResponse(response);
  }

  async videoSearch(file: File): Promise<Item[]> {
    const base64 = await this.base64.toBase64FromFile(file);

    const response = await this.client.graphql
      .get()
      .withClassName('BigSet')
      .withFields('name, media, url, _additional {certainty} ')
      .withNearVideo({video: base64})
      .withLimit(12)
      .do()

    return this.parseResponse(response);
  }

  private parseResponse(response: any): Promise<Item[]> {
    return response.data.Get.BigSet.map((item: any) => {
      return {
        name: item.name,
        url: item.url,
        media: item.media,
        certainty: item._additional.certainty,
      }
    })
  }
}
