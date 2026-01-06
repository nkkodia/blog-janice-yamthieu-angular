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
}
