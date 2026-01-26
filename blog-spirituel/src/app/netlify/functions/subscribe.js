// netlify/functions/subscribe.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { email } = JSON.parse(event.body);

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY, // On cache la clé ici !
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      listIds: [3], // L'ID trouvé dans les listes de Janice
      updateEnabled: true
    })
  });

  if (!response.ok) {
    return { statusCode: response.status, body: await response.text() };
  }

  return { statusCode: 200, body: JSON.stringify({ message: "Succès !" }) };
};
