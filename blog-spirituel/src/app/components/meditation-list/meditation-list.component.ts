import {Component, inject, OnInit} from '@angular/core';
import {ContentfulService} from '../../services/contentful';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';

@Component({
  selector: 'app-meditation-list',
  standalone: true,
  imports: [],
  templateUrl: './meditation-list.component.html',
  styleUrl: './meditation-list.component.scss'
})
export class MeditationListComponent implements OnInit {
  private contentService = inject(ContentfulService);
  meditations: any[] = [];

  ngOnInit(): void {
    this.loadMeditations();
  }

  async loadMeditations() {
    try {
      this.meditations = await this.contentService.getEntries('mditation');
      console.log("RÉSULTAT FINAL :", this.meditations);
    } catch (error) {
      console.error("ERREUR :", error);
    }
  }

  renderHtml(content: any) {
    if (!content) return '';
    return documentToHtmlString(content);
  }

  // Fonction pour partager sur les réseaux sociaux
  shareContent(title: string) {
    const url = window.location.href;
    const shareText = `Découvrez cette méditation : ${title}`;

    // Utilise l'API de partage native du navigateur si disponible (mobile)
    if (navigator.share) {
      navigator.share({
        title: title,
        text: shareText,
        url: url,
      }).catch(console.error);
    } else {
      // Sinon, ouvre une fenêtre de partage Facebook par défaut
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    }
  }

// Fonction pour scroller vers le formulaire de newsletter
  scrollToNewsletter() {
    const footerElement = document.getElementById('newsletter-section');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
