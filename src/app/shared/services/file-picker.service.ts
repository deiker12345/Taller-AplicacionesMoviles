import { Injectable } from '@angular/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Injectable()
export class FilePickerService {
  async pickFile() {
    try {
      const result = await FilePicker.pickFiles({
        limit: 1, 
      });

      if (result && result.files && result.files.length > 0) {
        return result.files[0];
      }
      return null;
    } catch (error) {
      console.error('Error picking file:', error);
      return null;
    }
  }
}
