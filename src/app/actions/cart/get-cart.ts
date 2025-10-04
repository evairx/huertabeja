'use server';
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSupabaseClient } from "@/libs/supabase";
import { cookies } from "next/headers";

interface CloudflareEnv {
    huertabeja_cart: KVNamespace;
}

interface Item {
    id: string;
    quantity: number;
}

interface Carrito {
    items: Item[];
    currency: string;
}

interface ProductResponse {
    id: string;
    name: string;
    price: number;
    slug: string;
}

interface CartItemResponse {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
    slug: string;
}

interface CartResponse {
    items: CartItemResponse[];
    subtotal: number;
    tax: number;
    total: number;
    total_quantity: number;
    currency: string;
}

export async function getCart() {
    try {
        const cookieStore = await cookies();
        const cartId = cookieStore.get('cart')?.value;

        if (!cartId) {
            return { status: 404, data: { error: "Carrito no encontrado" } };
        }

        const kv = (getCloudflareContext().env as CloudflareEnv).huertabeja_cart;

        if (!kv) {
            return { status: 500, data: { error: "Carrito no disponible" } };
        }

        const stored = await kv.get(cartId);
        let carrito: Carrito;

        if (stored) {
            try {
                carrito = JSON.parse(stored) as Carrito;
            } catch {
                carrito = { items: [], currency: "CLP" };
                await kv.put(cartId, JSON.stringify(carrito), {
                    expirationTtl: 60 * 60 * 24 * 30
                });
            }
        } else {
            carrito = { items: [], currency: "CLP" };
            await kv.put(cartId, JSON.stringify(carrito), {
                expirationTtl: 60 * 60 * 24 * 30
            });
        }

        if (carrito.items.length === 0) {
            const emptyResponse: CartResponse = {
                items: [],
                subtotal: 0,
                tax: 0,
                total: 0,
                total_quantity: 0,
                currency: "CLP"
            };
            return { status: 200, data: emptyResponse };
        }

        const supabase = getSupabaseClient();
        const productIds = carrito.items.map(item => item.id);

        const { data: products, error } = await supabase
            .from('productos')
            .select('id, name, price, slug, image')
            .in('id', productIds);

        if (error) {
            return { status: 500, data: { error: "Error al obtener productos" } };
        }

        const itemsWithDetails = carrito.items
            .map(item => {
                const product = products?.find(p => p.id === item.id);
                if (!product) return null;

                return {
                    id: item.id,
                    name: product.name,
                    image: product.image,
                    quantity: item.quantity,
                    price: product.price,
                    slug: product.slug
                };
            })
            .filter((item): item is CartItemResponse => item !== null);

        const subtotal = itemsWithDetails.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        const tax = subtotal * 0.19;

        const total = subtotal + tax;

        const response: CartResponse = {
            items: itemsWithDetails,
            subtotal: Math.round(subtotal),
            tax: Math.round(tax),
            total: Math.round(total),
            total_quantity: Number(itemsWithDetails.reduce((sum, item) => sum + item.quantity, 0)),
            currency: "CLP"
        };

        return { status: 200, data: response };

    } catch (err) {
        console.error(err);
        return { status: 500, data: { error: "Error al obtener el carrito" } };
    }
}