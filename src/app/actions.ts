'use server'
import { getSupabaseClient } from "@/libs/supabase"
import { cookies } from "next/headers";

export async function signInGoogle() {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: "http://localhost:3000/account/login/callback",
        },
    });

    if (error) {
        console.log('Error al iniciar sesión con Google:', error.message);
        return { status: 500, body: { error: error.message } };
    }

    return { status: 200, body: { data } };
}

export async function signIn(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email) {
        return { status: 400, body: { error: "El email es requerido" } }
    }

    if (!password) {
        return { status: 400, body: { error: "La contraseña es requerida" } }
    }

    const supabase = getSupabaseClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        return { status: 400, body: { error: error.message } }
    }

    return { status: 200, body: { data } };
}

export async function signUp(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name) {
        return { status: 400, body: { error: "El nombre es requerido" } }
    }

    if (!email) {
        return { status: 400, body: { error: "El email es requerido" } }
    }

    if (!password) {
        return { status: 400, body: { error: "La contraseña es requerida" } }
    }

    const supabase = getSupabaseClient();

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: name || '',
            }
        }
    });

    if (error) {
        return { status: 400, body: { error: error.message } }
    }

    return { status: 200, body: { message: "Usuario creado exitosamente" } };
}

export async function signOut() {
    const cookieStore = await cookies();

    const access_token = cookieStore.get("access_token")?.value || null;
    const refresh_token = cookieStore.get("refresh_token")?.value || null;

    if (!access_token || !refresh_token) {
        return { status: 400, body: { error: "No autenticado" } }
    }

    const supabase = getSupabaseClient();

    await supabase.auth.setSession({
        access_token: access_token,
        refresh_token: refresh_token,
    });

    const { error } = await supabase.auth.signOut();

    if (error) {
        return { status: 400, body: { error: error.message } }
    }

    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    return { status: 200 };
}

export async function setSession(access_token: string, refresh_token: string, at_expires_at: number) {
    if (!access_token || !refresh_token) return { status: 500 };
    const cookieStore = await cookies();

    const now = Math.floor(Date.now() / 1000);
    const maxAge = at_expires_at - now;

    cookieStore.set("access_token", access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge
    });

    cookieStore.set("refresh_token", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
    });

    return { status: 200 };
}

export async function isLogged() {
    const cookieStore = await cookies();

    const refresh_token = cookieStore.get("refresh_token")?.value || null;

    if (!refresh_token) {
        return { status: 200, body: { isLogged: false } }
    }

    return { status: 200, body: { isLogged: true } };
}

export async function getSession() {
    const cookieStore = await cookies();

    const access_token = cookieStore.get("access_token")?.value || null;
    const refresh_token = cookieStore.get("refresh_token")?.value || null;

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

    const { data: sessionData, error: sessionError } = await supabase.from("users").select("*").eq("id", user?.id).single();

    if (sessionError) {
        return { status: 400, body: { error: sessionError.message } }
    }

    return { status: 200, body: { data: sessionData } };
}

export async function sendResetPasswordEmail(formData: FormData) {
    const supabase = getSupabaseClient();
    const email = formData.get("email") as string;

    if (!email) {
        return { status: 400, body: { error: "El email es requerido" } }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/reset-password/callback",
    });

    if (error) {
        return { status: 400, body: { error: error.message } }
    }

    return { status: 200, body: true };
}

export async function updatePassword(formData: FormData) {
    const cookieStore = await cookies();

    const access_token = cookieStore.get("access_token")?.value || null;
    const refresh_token = cookieStore.get("refresh_token")?.value || null;

    if (!access_token || !refresh_token) {
        return { status: 400, body: { error: "No autenticado" } }
    }

    const password = formData.get("password") as string;

    if (!password) {
        return { status: 400, body: { error: "La contraseña es requerida" } }
    }

    const supabase = getSupabaseClient();

    await supabase.auth.setSession({
        access_token: access_token,
        refresh_token: refresh_token,
    });

    const { data, error } = await supabase.auth.updateUser({
        password
    });

    if (error) {
        return { status: 400, body: { error: error.message } }
    }

    return { status: 200, body: { data } };
}

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

export async function saveCardToken(token: string, docType?: string, docNumber?: string) {
    try {
        if (!token && token.length === 0 && !docNumber && docNumber?.length === 0 && !docType && docType?.length === 0) {
            return { status: 400, body: { error: "Todos los campos son requeridos" } }
        }

        const cookieStore = await cookies();

        const access_token = cookieStore.get("access_token")?.value || null;
        const refresh_token = cookieStore.get("refresh_token")?.value || null;

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

export async function removeCard(id: string, card_id: number) {
    try {
        if (!id || id.length === 0 && !card_id || card_id.toString().length === 0) {
            return { status: 400, body: { error: "Todos los campos son requeridos" } }
        }

        const cookieStore = await cookies();

        const access_token = cookieStore.get("access_token")?.value || null;
        const refresh_token = cookieStore.get("refresh_token")?.value || null;

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