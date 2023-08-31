import { Component } from '@angular/core';
import { Item, WeaviateService } from '../weaviate.service';

enum SearchState {
  None,
  Searching,
  ResultsReturned
}

enum Media {
  None,
  Text,
  Image,
  Audio,
  Video
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  
  public result: Item[] = [];
  public query: string = "City car";
  public fileSrc: any = '';
  public queryType: string = 'text';
  public queryInProgress: boolean = false;

  constructor(private weaviate:WeaviateService) {}

  onKeydown(event: any) {
    if (event.key === "Enter")
      this.textSearch();
  }

  async textSearch() {
    this.queryType = 'text',

    this.queryInProgress = true;
    this.result = [];
    this.result = await this.weaviate.textSearch(this.query);
    this.queryInProgress = false;
    // console.log(JSON.stringify(this.result, null, 2));
  }

  async imageSearch($event: any) {    
    const file: File = $event.target.files[0];
    this.displayMedia(file, 'image');

    this.queryInProgress = true;
    this.result = [];
    this.result = await this.weaviate.imageSearch(file);
    this.queryInProgress = false;
  }

  async audioSearch($event: any) {
    const file: File = $event.target.files[0];
    this.displayMedia(file, 'audio');
    
    this.queryInProgress = true;
    this.result = [];
    this.result = await this.weaviate.audioSearch(file);
    this.queryInProgress = false;
  }

  async videoSearch($event: any) {
    const file: File = $event.target.files[0];
    this.displayMedia(file, 'video');

    this.queryInProgress = true;
    this.result = [];
    this.result = await this.weaviate.videoSearch(file);
    this.queryInProgress = false;
  }

  displayMedia (file: File, media: string) {
    const reader  = new FileReader();
    reader.onload = (e: any) => {
      this.queryType = media;
      this.fileSrc = e.target.result;
    }
    reader.readAsDataURL(file);
  }
}
