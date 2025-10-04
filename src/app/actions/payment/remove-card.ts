'use server'
import { getSupabaseClient } from "@/libs/supabase"
import { cookies } from "next/headers";

export async function removeCard(id: string, card_id: number) {
    try {
        if (!id || id.length === 0 && !card_id || card_id.toString().length === 0) {
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

        if (!customer || customerError) {
            return { status: 400, body: { error: "Cliente no encontrado" } }
        }

        const res = await fetch(`https://api.mercadopago.com/v1/customers/${customer.customer_id}/cards/${card_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            },
        })

        if (res.status !== 200) {
            const dataCard = await res.json();
            console.error('Error eliminando la tarjeta en MercadoPago:', dataCard);
            return { status: 400, body: { error: "Error eliminando la tarjeta en MercadoPago", res: dataCard } }
        }

        const { data: customerDelete, error: customerDeleteError } = await supabase
            .from('payment_card_users')
            .delete()
            .eq('id', id)
            .single();

        if (customerDeleteError) {
            return { status: 400, body: { error: customerDeleteError.message } }
        }

        return { status: 200, body: { message: "Tarjeta eliminada exitosamente" } };
    } catch (err) {
        console.log(err);
        return { status: 500, body: { error: "Error al eliminar la tarjeta" } }
    }
}
