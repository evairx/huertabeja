'use server'

export async function createPaymentMercadoPago(token: string, payment_method_id: string, issuer_id: string) {
    try {
        await fetch('https://api.mercadopago.com/v1/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
                transaction_amount: 1500,
                token,
                description: 'Descripción del producto',
                installments: 1,
                payment_method_id,
                issuer_id,
                payer: {
                    email: "akongamer14@gmail.com",
                    identification: {
                        type: "RUT",
                        number: "123456789"
                    }
                },
            })
        }).then(response => response.json()).then(data => {
            console.log('Pago creado:', data);
        }).catch(error => {
            console.error('Error creando el pago:', error);
        });
    } catch (err) {
        console.log(err);
        return { status: 500, body: { error: "Error al procesar el pago" } }
    }
}
