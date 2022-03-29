import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  async saveInDisk(name: string, file: any ){
    const dateNow = new Date();
    const fileSave = `${name}-${dateNow}.jpeg` ?? `scanner-${dateNow}.jpeg`;
    await Filesystem.writeFile({
      path: `scanner/${fileSave}`,
      data: file,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  }
}
