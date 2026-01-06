import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ContentfulService } from '../../services/contentful';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  private contentService = inject(ContentfulService);
  aboutContent: any;

  ngOnInit(): void {
    // On appelle la méthode sans 'await' pour respecter l'interface OnInit
    this.loadAboutContent();
  }

  private async loadAboutContent() {
    // On récupère spécifiquement le type 'aPropos'
    const res = await this.contentService.getEntries('aPropos');
    if (res && res.length > 0) {
      this.aboutContent = res[0]; // On récupère l'entrée 'Untitled'
    }
  }
  // Ajoute cette méthode dans ta classe
  getTextFromRichText(field: any): string {
    try {
      // On descend dans la structure JSON de Contentful
      return field?.content?.[0]?.content?.[0]?.value || '';
    } catch (e) {
      return '';
    }
  }
}
