import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html'
})
export class LegalComponent implements OnInit {
  type: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // ON ÉCOUTE LE PARAMÈTRE DYNAMIQUE (:type)
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
      console.log("Page légale affichée :", this.type);
    });
  }
}
