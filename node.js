const express = require('express');
const MercadoPago = require('mercadopago');

const app = express();
MercadoPago.configure({
    access_token: 'TEST-919708042683898-120322-388e07dc28b72f7adf3119692b56ba83-568286023',
});

app.post('/create_preference', async (req, res) => {
    try {
        const { planName, planPrice } = req.body;

        const preference = {
            items: [
                {
                    title: planName,
                    quantity: 1,
                    unit_price: planPrice,
                },
            ],
            back_urls: {
                success: 'https://seusite.com/success',
                failure: 'https://seusite.com/failure',
                pending: 'https://seusite.com/pending',
            },
            auto_return: 'approved',
        };

        const response = await MercadoPago.preferences.create(preference);
        res.json({ init_point: response.body.init_point });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar preferência' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
