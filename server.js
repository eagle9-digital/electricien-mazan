const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Contact form endpoint
app.post('/api/devis', (req, res) => {
  const { name, phone, email, service, city, message } = req.body;

  if (!name || !phone || !service) {
    return res.status(400).json({ error: 'Champs obligatoires manquants.' });
  }

  // TODO: send email via nodemailer or store in DB
  console.log('Nouvelle demande de devis:', { name, phone, email, service, city, message });

  res.json({ success: true, message: 'Demande reçue. Nous vous recontactons sous 24h.' });
});

// Catch-all: serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Ferreri Électricité — serveur démarré sur http://localhost:${PORT}`);
});
