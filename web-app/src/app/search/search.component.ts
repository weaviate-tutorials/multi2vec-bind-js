import { Component, Renderer2} from '@angular/core';
import { Item, WeaviateService } from '../weaviate.service';
import { WeaviateBigService } from '../weaviate-big.service';

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
  public bigSearch = false;

  constructor(
    private weaviate:WeaviateService,
    private big: WeaviateBigService,
    private renderer: Renderer2
  ) {}

  onKeydown(event: any) {
    if (event.key === "Enter")
      this.textSearch();
  }

  async textSearch() {
    this.queryType = 'text',

    this.queryInProgress = true;
    this.result = [];

    if(this.bigSearch)
      this.result = await this.big.textSearch(this.query);
    else
      this.result = await this.weaviate.textSearch(this.query);

    this.queryInProgress = false;
   
    this.scrollToResults();
  }

  async imageSearch($event: any) {    
    const file: File = $event.target.files[0];
    this.displayMedia(file, 'image');

    this.queryInProgress = true;
    this.result = [];

    if(this.bigSearch)
      this.result = await this.big.imageSearch(file);
    else
      this.result = await this.weaviate.imageSearch(file);

    this.queryInProgress = false;
    
    this.scrollToResults();
  }

  async audioSearch($event: any) {
    const file: File = $event.target.files[0];
    this.displayMedia(file, 'audio');
    
    this.queryInProgress = true;
    this.result = [];

    if(this.bigSearch)
      this.result = await this.big.audioSearch(file);
    else
      this.result = await this.weaviate.audioSearch(file);

    this.queryInProgress = false;

    this.scrollToResults();
  }

  async videoSearch($event: any) {
    const file: File = $event.target.files[0];
    this.displayMedia(file, 'video');

    this.queryInProgress = true;
    this.result = [];

    if(this.bigSearch)
      this.result = await this.big.videoSearch(file);
    else
      this.result = await this.weaviate.videoSearch(file);

    this.queryInProgress = false;

    this.scrollToResults();
  }

  displayMedia (file: File, media: string) {
    const reader  = new FileReader();
    reader.onload = (e: any) => {
      this.queryType = media;
      this.fileSrc = e.target.result;
    }
    reader.readAsDataURL(file);
  }

  scrollToResults() {
    const lastElement = document.querySelector("#scrollDown");

    if (lastElement) {
      lastElement.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    const hrEl = document.querySelector("#whiteBar"); 
    if (hrEl) {
      this.renderer.setStyle(hrEl, 'width', '75%');
      this.renderer.setStyle(hrEl, 'opacity', '1');
    }
  }
}
