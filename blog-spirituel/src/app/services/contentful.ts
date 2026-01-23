import { Injectable } from '@angular/core';
import { createClient, ContentfulClientApi } from 'contentful';
import { environment } from '../../environments/environment';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private client: ContentfulClientApi<any>;

  constructor() {
    this.client = createClient({
      space: environment.contentful.spaceId,
      accessToken: environment.contentful.accessToken,
    });
  }

  async getEntries(contentType: string) {
    try {
      // Étape 1 : On essaie de récupérer TOUT pour voir si la connexion marche
      const rawRes = await this.client.getEntries();
      console.log("TEST CONNEXION - Objets trouvés au total :", rawRes.items.length);
      console.log("LISTE DES IDS DISPONIBLES :", rawRes.items.map(i => i.sys.contentType.sys.id));

      // Étape 2 : Ta requête normale
      const res = await this.client.getEntries({
        content_type: contentType,
        include: 2
      });
      return res.items;
    } catch (error) {
      console.error("ERREUR CRITIQUE CONTENTFUL :", error);
      return [];
    }
  }

  // Récupérer les produits de la boutique (Ebooks, Audio, etc.)
  getProducts() {
    return from(this.client.getEntries({
      content_type: 'product', // Doit correspondre à l'ID du Content Type dans Contentful
      order: ['-sys.createdAt'] // Affiche les plus récents en premier
    }));
  }
}
