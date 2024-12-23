import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

// Используем правильный URL для Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxn4Xe4XbtFdlzC26RLrDzs2BeIXUcm2nbhCirEfNGpVKW3HJSU0weFcfYHZoG1oaxUHg/exec';

app.post('/order', async (req, res) => {
  const { id, title, price, imageUrl } = req.body;

  const orderData = {
    id: id || Date.now(),
    title: title || 'Default Title',
    price: price || 0,
    imageUrl: imageUrl || '',
  };

  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, orderData, {
      headers: { 'Content-Type': 'application/json' },
    });

    res.status(201).send(response.data);
  } catch (error) {
    console.error('Ошибка при отправке данных:', error.message);
    res.status(500).send('Ошибка при сохранении данных');
  }
});

const port = 7754;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
