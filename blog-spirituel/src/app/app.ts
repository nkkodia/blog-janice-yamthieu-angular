import { Component, signal } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NewsletterService} from './services/newsletter.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true, // Assure-toi que c'est présent
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  showSuccessPopup = false;
  newsletterSuccess = false;

  constructor(private newsletterService: NewsletterService, private http: HttpClient) {}


  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const emailValue = formData.get('email');

    // Configuration de l'appel Brevo
    const url = 'https://api.brevo.com/v3/contacts';
    const headers = new HttpHeaders({
      'api-key': '', // La clé trouvée dans "Clés API et MCP"
      'Content-Type': 'application/json'
    });

    const body = {
      email: emailValue,
      listIds: [3], // Ton ID de liste récupéré
      updateEnabled: true
    };

    // Envoi de la requête
    this.http.post(url, body, { headers }).subscribe({
      next: () => {
        alert('Inscription réussie dans la liste de Janice !');
        form.reset();
      },
      error: (err) => {
        console.error('Erreur technique :', err);
        alert('Vérifie ta clé API ou la connexion.');
      }
    });
  }
}
