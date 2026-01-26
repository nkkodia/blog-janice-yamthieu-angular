import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import {ContentfulService} from '../../services/contentful';

@Component({
  selector: 'app-meditation-detail',
  templateUrl: './meditation-detail.component.html'
})
export class MeditationDetailComponent implements OnInit {
  // On initialise à null pour éviter les erreurs "unresolved" au chargement
  meditation: any = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private contentfulService: ContentfulService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      // Appel de la fonction de recherche par slug
      this.contentfulService.getMeditationBySlug(slug).then(entry => {
        this.meditation = entry;
        this.loading = false;
      });
    }
  }

  // Transforme le champ "Contenu" (Rich Text) en HTML
  renderHtml(content: any): string {
    return content ? documentToHtmlString(content) : '';
  }
}
