import { Injectable } from '@angular/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';

export interface PickedFile {
  name: string;
  blob?: Blob;
  mimeType?: string;
  path?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class FilePickerService {

  constructor() {}

  async pickFile(): Promise<PickedFile | null> {
    try {
      const result = await FilePicker.pickFiles({
        limit: 1
      });

      if (result.files && result.files.length > 0) {
        const file = result.files[0];

        return {
          name: file.name,
          blob: file.blob,           
          mimeType: file.mimeType,   
          path: file.path           
        };
      }

      return null;
    } catch (error) {
      console.error('[FilePickerService] Error seleccionando archivo:', error);
      return null;
    }
  }
}
