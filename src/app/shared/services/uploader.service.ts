import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { PickedFile } from './file-picker.service';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  /**
   * @param file 
   * @param userId 
   */
  async uploadFile(file: PickedFile, userId: string): Promise<string | null> {
    try {
      if (!file.blob) {
        throw new Error('El archivo no contiene un blob válido.');
      }

      const filePath = `${userId}/${Date.now()}-${file.name}`;

      const { error } = await this.supabase.storage
        .from(environment.supabaseBucket)
        .upload(filePath, file.blob, {
          contentType: file.mimeType ?? 'application/octet-stream',
          upsert: false
        });

      if (error) {
        console.error('[UploaderService] Error al subir archivo:', error.message);
        return null;
      }

      const { data } = this.supabase.storage
        .from(environment.supabaseBucket)
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err) {
      console.error('[UploaderService] Error inesperado:', err);
      return null;
    }
  }
}
