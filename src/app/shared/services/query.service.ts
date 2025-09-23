import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  /**
   * @param userId 
   */
  async listUserImages(userId: string): Promise<string[]> {
    try {
      const { data, error } = await this.supabase
        .storage
        .from(environment.supabaseBucket)
        .list(userId + '/', {
          limit: 50,  
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        console.error('[QueryService] Error listando imágenes:', error.message);
        return [];
      }

      const urls = data.map(file => {
        const { data: publicUrl } = this.supabase
          .storage
          .from(environment.supabaseBucket)
          .getPublicUrl(`${userId}/${file.name}`);
        return publicUrl.publicUrl;
      });

      return urls;
    } catch (err) {
      console.error('[QueryService] Error inesperado:', err);
      return [];
    }
  }

  /**
   * @param path 
   */
  getFileUrl(path: string): string {
    const { data } = this.supabase
      .storage
      .from(environment.supabaseBucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }
}
