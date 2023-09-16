import { Component, Renderer2} from '@angular/core';
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

  constructor(private weaviate:WeaviateService,private renderer: Renderer2 ) {}
  

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
   
    const hrEl = document.querySelector("#whiteBar"); 
    if (hrEl) {
      this.renderer.setStyle(hrEl, 'width', '100%');
      this.renderer.setStyle(hrEl, 'opacity', '1');
    }

    
  }

  async imageSearch($event: any) {    
    const file: File = $event.target.files[0];
    this.displayMedia(file, 'image');

    this.queryInProgress = true;
    this.result = [];
    this.result = await this.weaviate.imageSearch(file);
    this.queryInProgress = false;
   
    
     const lastElement = document.querySelector("#scrollDown"); 
     
     if (lastElement) {
       lastElement.scrollIntoView({ behavior: "smooth", block: "end" });
       
     }
     const hrEl = document.querySelector("#whiteBar"); 
     if (hrEl) {
       this.renderer.setStyle(hrEl, 'width', '50%');
       this.renderer.setStyle(hrEl, 'opacity', '1');
     }
  }

  async audioSearch($event: any) {
    const file: File = $event.target.files[0];
    this.displayMedia(file, 'audio');
    
    this.queryInProgress = true;
    this.result = [];
    this.result = await this.weaviate.audioSearch(file);
    this.queryInProgress = false;
    const lastElement = document.querySelector("#scrollDown"); 
    if (lastElement) {
      lastElement.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    const hrEl = document.querySelector("#whiteBar"); 
    if (hrEl) {
      this.renderer.setStyle(hrEl, 'width', '50%');
      this.renderer.setStyle(hrEl, 'opacity', '1');
    }
  }

  async videoSearch($event: any) {
    const file: File = $event.target.files[0];
    this.displayMedia(file, 'video');

    this.queryInProgress = true;
    this.result = [];
    this.result = await this.weaviate.videoSearch(file);
    this.queryInProgress = false;
    const lastElement = document.querySelector("#scrollDown"); 
    if (lastElement) {
      lastElement.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    const hrEl = document.querySelector("#whiteBar"); 
    if (hrEl) {
      this.renderer.setStyle(hrEl, 'width', '50%');
      this.renderer.setStyle(hrEl, 'opacity', '1');
    }
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
