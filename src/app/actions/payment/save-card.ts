'use server'
import { getSupabaseClient } from "@/libs/supabase"
import { cookies } from "next/headers";

export async function saveCardToken(token: string, docType?: string, docNumber?: string) {
    try {
        if (!token && token.length === 0 && !docNumber && docNumber?.length === 0 && !docType && docType?.length === 0) {
            return { status: 400, body: { error: "Todos los campos son requeridos" } }
        }

        const cookieStore = await cookies();

        const access_token = cookieStore.get("sid")?.value || null;
        const refresh_token = cookieStore.get("rid")?.value || null;

        if (!access_token || !refresh_token) {
            return { status: 400, body: { error: "No autenticado" } }
        }

        const supabase = getSupabaseClient();

        await supabase.auth.setSession({
            access_token: access_token,
            refresh_token: refresh_token,
        });

        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
            return { status: 400, body: { error: error.message } }
        }

        const { data: customer, error: customerError } = await supabase
            .from('customers_user')
            .select('*')
            .eq('user_id', user?.id)
            .single();

        if (!customer && customerError) {
            const body = {
                email: user?.user_metadata?.email,
                first_name: user?.user_metadata?.full_name,
                identification: {
                    type: docType,
                    number: docNumber
                },
                date_registered: new Date().toISOString(),
                description: "Cliente creado desde HuertaBeja",
                default_card: "none",
            }

            const res = await fetch('https://api.mercadopago.com/v1/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                },
                body: JSON.stringify(body)
            })

            const dataCustomer = await res.json() as { id: string };

            if (res.status !== 201) {
                console.error('Error creando el cliente en MercadoPago:', dataCustomer);
                return { status: 400, body: { error: "Error creando el cliente en MercadoPago", res: dataCustomer } }
            }

            const { data: newCustomer, error: newCustomerError } = await supabase
                .from('customers_user')
                .insert({
                    user_id: user?.id,
                    customer_id: dataCustomer.id,
                })

            console.log(newCustomer, newCustomerError)

            if (newCustomerError) {
                return { status: 400, body: { error: newCustomerError.message } }
            }

            const resCard = await fetch(`https://api.mercadopago.com/v1/customers/${dataCustomer.id}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                },
                body: JSON.stringify({
                    token
                })
            })

            const dataCard = await resCard.json() as {
                id: string;
                payment_method: { name: string };
                last_four_digits: string;
            };

            if (resCard.status !== 201) {
                console.error('Error guardando la tarjeta en MercadoPago:', dataCard);
                return { status: 400, body: { error: "Error guardando la tarjeta en MercadoPago", res: dataCard } }
            }

            const { data: card, error: cardError } = await supabase
                .from('payment_card_users')
                .insert({
                    card_id: dataCard.id,
                    customer_id: dataCustomer.id,
                    title: dataCard.payment_method.name,
                    user_id: user?.id,
                    last_four_digits: Number(dataCard.last_four_digits),
                })

            if (cardError) {
                return { status: 400, body: { error: cardError.message } }
            }

            return { status: 200, body: { message: "Tarjeta guardada exitosamente", response: card } }
        } else {
            const resCard = await fetch(`https://api.mercadopago.com/v1/customers/${customer.customer_id}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                },
                body: JSON.stringify({
                    token
                })
            })

            const dataCard = await resCard.json() as {
                id: string;
                payment_method: { name: string };
                last_four_digits: string;
            };

            if (resCard.status !== 201) {
                console.error('Error guardando la tarjeta en MercadoPago:', dataCard);
                return { status: 400, body: { error: "Error guardando la tarjeta en MercadoPago", res: dataCard } }
            }

            const { data: card, error: cardError } = await supabase
                .from('payment_card_users')
                .insert({
                    card_id: dataCard.id,
                    customer_id: customer.customer_id,
                    title: dataCard.payment_method.name.toUpperCase(),
                    user_id: user?.id,
                    last_four_digits: Number(dataCard.last_four_digits),
                })

            if (cardError) {
                return { status: 400, body: { error: cardError.message } }
            }

            return { status: 200, body: { message: "Tarjeta guardada exitosamente", response: card } };
        }
    } catch (err) {
        console.log(err);
        return { status: 500, body: { error: "Error al guardar la tarjeta" } };
    }
}