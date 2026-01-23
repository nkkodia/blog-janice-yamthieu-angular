import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html'
})
export class LegalComponent implements OnInit {
  type: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // On écoute le changement de route pour savoir quelle page afficher
    this.route.data.subscribe(data => {
      this.type = data['type'];
    });
  }
}
