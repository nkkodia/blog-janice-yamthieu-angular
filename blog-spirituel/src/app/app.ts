import { Component, signal } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Assure-toi que c'est présent
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent { // Renomme "App" en "AppComponent"
  title = 'blog-spirituel';

  showSuccessPopup = false; // Variable pour contrôler la popup

  async handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      // On remplace l'alerte système par notre popup stylisée
      this.showSuccessPopup = true;
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }
}
