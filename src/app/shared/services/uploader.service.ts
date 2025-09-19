import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class UploaderService {
  private supabase: SupabaseClient;

  constructor() {
    const url = 'YOUR_SUPABASE_URL';
    const key = 'YOUR_SUPABASE_ANON_KEY';
    this.supabase = createClient(url, key);
  }

  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });

    if (error) throw error;
    return data;
  }

  async getPublicUrl(bucket: string, path: string) {
    const { data } = this.supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl; 
  }
}
