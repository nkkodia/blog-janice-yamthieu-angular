const axios = require('axios');

exports.handler = async (event) => {
  // On récupère l'email envoyé par ton formulaire Angular
  const { email } = JSON.parse(event.body);

  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/contacts',
      {
        email: email,
        listIds: [3], // Ta liste Janice #3
        updateEnabled: true
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY, // Ici, Netlify injecte la clé secrètement
          'Content-Type': 'application/json'
        }
      }
    );

    return { statusCode: 201, body: JSON.stringify({ message: "Succès !" }) };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: "Erreur lors de l'inscription" })
    };
  }
};
