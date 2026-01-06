import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router'; // Importation nécessaire pour le sous-menu
import { ContentfulService } from '../../services/contentful';

@Component({
  selector: 'app-multimedia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multimedia.component.html'
})
export class MultimediaComponent implements OnInit {
  private contentService = inject(ContentfulService);
  private sanitizer = inject(DomSanitizer);
  private route = inject(ActivatedRoute); // Injection pour écouter les paramètres d'URL

  allItems: any[] = []; // Stockage de la liste complète brute
  filteredItems: any[] = []; // Liste affichée après filtrage

  ngOnInit(): void {
    this.loadMultimedia();
  }

  async loadMultimedia() {
    // 1. Récupération des données depuis Contentful
    this.allItems = await this.contentService.getEntries('multimedia');

    // 2. Écoute des queryParams pour filtrer (ex: ?type=Video)
    this.route.queryParams.subscribe(params => {
      const typeFilter = params['type'];

      if (typeFilter) {
        // Filtre selon le champ 'type' défini dans Contentful
        this.filteredItems = this.allItems.filter(item =>
          item.fields['type'] === typeFilter
        );
      } else {
        // Si aucun filtre, on affiche tout (page Multimedia principale)
        this.filteredItems = this.allItems;
      }
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    if (!url) return '';
    let finalUrl = '';

    // Gestion YouTube : conversion du lien standard en format 'embed'
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
      finalUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    // Gestion Spotify : conversion vers le lecteur intégré
    else if (url.includes('spotify.com')) {
      // Transformation robuste du lien pour l'iframe
      finalUrl = url.replace('/track/', '/embed/track/');
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(finalUrl);
  }
}
