import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Base64Service {

  constructor() { }

  async toBase64FromUrl(url: string) {
    const response = await fetch(url);
    const blob = await response.blob();

    return this.toBase64(blob);
  }

  async toBase64FromFile(file: File) {
    return this.toBase64(file);
  }

  private async toBase64(blob: File | Blob): Promise<string> {
    const reader = new FileReader();
    await new Promise((resolve, reject) => {
      reader.onload = resolve;
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    return (reader.result as string);
  }
}
