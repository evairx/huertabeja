'use server';
import { getCloudflareContext } from "@opennextjs/cloudflare";
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

export async function removeCart(itemId: string) {
    try {
        const cookieStore = await cookies();
        const cartId = cookieStore.get('cart')?.value;

        if (!cartId) {
            return { status: 404, error: "Carrito no encontrado" };
        }

        const kv = (getCloudflareContext().env as CloudflareEnv).huertabeja_cart;

        if (!kv) {
            return { status: 500, error: "KV no disponible" };
        }

        if (!itemId) {
            return { status: 400, error: "ID de producto no proporcionado" };
        }

        const stored = await kv.get(cartId);
        let carrito: Carrito;

        if (stored) {
            try {
                carrito = JSON.parse(stored) as Carrito;
            } catch {
                carrito = { items: [], currency: "CLP" };
            }
        } else {
            carrito = { items: [], currency: "CLP" };
        }

        const initialLength = carrito.items.length;
        carrito.items = carrito.items.filter(item => item.id !== itemId);

        if (carrito.items.length === initialLength) {
            return { status: 404, error: "Producto no encontrado en el carrito" };
        }

        await kv.put(cartId, JSON.stringify(carrito), {
            expirationTtl: 60 * 60 * 24 * 30
        });

        return { status: 200, message: "Producto eliminado del carrito" };

    } catch (err) {
        console.error(err);
        return { status: 500, error: "Error al eliminar producto del carrito" };
    }
}