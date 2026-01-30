import { Component, OnInit } from '@angular/core';
import {ContentfulService} from '../../services/contentful';
import {FormsModule} from '@angular/forms';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  allProduits: any[] = [];
  produitsFiltres: any[] = [];
  ongletActif: 'ebook' | 'photo' = 'ebook';
  cgvAcceptees: boolean = false; // Par défaut, non coché
  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.contentfulService.getProducts().subscribe({
      next: (data: any) => {
        this.allProduits = data.items || data;
        this.filtrer('ebook');
      }
    });
  }

  filtrer(type: 'ebook' | 'photo') {
    this.ongletActif = type;
    this.produitsFiltres = this.allProduits.filter(p => p.fields.type === type);
  }

  verifierCGV(event: Event, lien: string) {
    if (!this.cgvAcceptees) {
      event.preventDefault();
      alert("Veuillez accepter les Conditions Générales de Vente avant de continuer.");
    }
  }
}
