import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ContentfulService} from '../../services/contentful';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  imports: [
    AsyncPipe
  ],
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  produits$!: Observable<any[]>;

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    // On récupère les entrées de type 'produit' créées dans Contentful
    this.produits$ = this.contentfulService.getProducts().pipe(
      map(entries => entries.items)
    );
  }
}
