import { Component, signal } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NewsletterService} from './services/newsletter.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

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
  private apiKey: string = environment.brevoApiKey;
  constructor(private newsletterService: NewsletterService, private http: HttpClient) {}


  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const emailValue = formData.get('email');

    const url = '/.netlify/functions/subscribe';

    this.http.post(url, { email: emailValue }).subscribe({
      next: () => {
        alert('Inscription réussie dans la liste de Janice !');
        form.reset();
      },
      error: (err) => {
        console.error('Erreur technique :', err);
        alert('Un souci est survenu. Réessaye plus tard.');
      }
    });
  }
}
