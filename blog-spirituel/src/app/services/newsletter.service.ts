import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  // L'URL officielle de l'API Brevo v3
  private apiUrl = 'https://api.brevo.com/v3/contacts';

  // À REMPLACER par la clé que Janice va te donner
  private apiKey: string = environment.brevoApiKey;
  constructor(private http: HttpClient) {}

  subscribe(email: string) {
    const headers = new HttpHeaders({
      'api-key': this.apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const body = {
      email: email,
      // L'ID de la liste (ex: 2) trouvé dans Contacts > Listes
      listIds: [2],
      updateEnabled: true // Permet de mettre à jour si l'abonné existe déjà
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
