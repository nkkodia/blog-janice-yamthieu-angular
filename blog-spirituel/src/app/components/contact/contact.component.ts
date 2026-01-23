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

    try {
      // --- ÉTAPE A : Envoi vers Netlify (pour l'archive) ---
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      // --- ÉTAPE B : Envoi vers l'email de Janice via EmailJS ---
      // Remplace les codes ci-dessous par ceux que Janice va te donner
      await emailjs.sendForm(
        'SERVICE_ID_DE_JANICE',
        'TEMPLATE_ID_DE_JANICE',
        form,
        'PUBLIC_KEY_DE_JANICE'
      );

      // --- ÉTAPE C : Succès ---
      this.showSuccessPopup = true;
      form.reset();

    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Une erreur est survenue, mais Janice recevra votre message via Netlify.");
    } finally {
      this.isSubmitting = false;
    }
  }
}
