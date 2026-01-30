import {Component, inject} from '@angular/core';
import emailjs from '@emailjs/browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  isSubmitting = false;
  private router = inject(Router); // Injecte le Router

  async handleContactSubmit(event: Event) {
    event.preventDefault();
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const objetSelectionne = formData.get('objet');

    try {
      // 1. Envoi EmailJS
      await emailjs.sendForm(
        'service_hh1jjka',
        'template_ey4is37',
        form,
        '0SZXj3QB-3FeWFIum'
      );

      // 2. Logique PayPal si besoin
      if (objetSelectionne === 'don') {
        window.open('https://www.paypal.me/ApoYamthieu', '_blank');
      }

      // 3. REDIRECTION ET MESSAGE
      // On redirige vers l'accueil (ou une page succès) avec un message
      alert("Votre message a bien été envoyé ! Janice vous répondra prochainement.");
      this.router.navigate(['/meditations']); // On quitte la page contact

    } catch (error) {
      console.error("Erreur :", error);
      alert("Une erreur est survenue.");
    } finally {
      this.isSubmitting = false;
    }
  }

}
