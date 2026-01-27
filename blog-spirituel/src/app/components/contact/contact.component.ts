import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  showSuccessPopup = false;
  isSubmitting = false;

  async handleContactSubmit(event: Event) {
    event.preventDefault();
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // On récupère la valeur du menu déroulant "objet"
    const objetSelectionne = formData.get('objet');

    try {
      // 1. Archivage Netlify
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      // 2. Envoi EmailJS à Janice
      await emailjs.sendForm(
        'service_hh1jjka',
        'template_ey4is37',
        form,
        '0SZXj3QB-3FeWFIum'
      );

      // 3. Logique Spécifique PayPal
      if (objetSelectionne === 'don') {
        // On affiche d'abord un message ou on redirige directement
        // L'utilisation de _blank permet de garder le site ouvert à côté
        window.open('https://www.paypal.me/ApoYamthieu', '_blank');
      }

      this.showSuccessPopup = true;
      form.reset();

    } catch (error) {
      console.error("Erreur :", error);
      alert("Une erreur est survenue lors de l'envoi.");
    } finally {
      this.isSubmitting = false;
    }
  }

}
