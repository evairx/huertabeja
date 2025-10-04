import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";
import { getSupabaseClient } from "@/libs/supabase";

export interface CloudflareEnv {
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

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const cartId = cookieStore.get('cart')?.value;

        if (!cartId) {
            return new Response(JSON.stringify({ error: "Carrito no encontrado" }), { status: 404 });
        }

        const kv = (getCloudflareContext().env as CloudflareEnv).huertabeja_cart;
        
        if (!kv) {
            return new Response(JSON.stringify({ error: "KV no disponible" }), { status: 500 });
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
            return new Response(JSON.stringify(emptyResponse), {
                headers: { "Content-Type": "application/json" }
            });
        }
        const supabase = getSupabaseClient();
        const productIds = carrito.items.map(item => item.id);

        const { data: products, error } = await supabase
            .from('productos')
            .select('id, name, price, slug, image')
            .in('id', productIds);
        
        if (error) {
            return new Response(JSON.stringify({ error: "Error al obtener productos" }), { status: 500 });
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
            total_quantity: itemsWithDetails.reduce((sum, item) => sum + item.quantity, 0),
            currency: "CLP"
        };

        return new Response(JSON.stringify(response), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Error al obtener el carrito" }), { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const url = new URL(request.url);
        const cartId = url.searchParams.get("cart");

        if (!cartId) {
            return new Response(JSON.stringify({ error: "CartId no proporcionado" }), { status: 400 });
        }

        const kv = (getCloudflareContext().env as CloudflareEnv).huertabeja_cart;
        
        if (!kv) {
            return new Response(JSON.stringify({ error: "KV no disponible" }), { status: 500 });
        }

        const updates: { id: string; quantity: string | number }[] = await request.json();

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

        updates.forEach(update => {
            const quantity = typeof update.quantity === 'string' 
                ? parseInt(update.quantity, 10) 
                : update.quantity;

            if (isNaN(quantity) || quantity < 0) {
                return;
            }

            const index = carrito.items.findIndex(item => item.id === update.id);

            if (index > -1) {
                carrito.items[index].quantity += quantity;
                
                if (carrito.items[index].quantity <= 0) {
                    carrito.items.splice(index, 1);
                }
            } else {
                if (quantity > 0) {
                    carrito.items.push({
                        id: update.id,
                        quantity: quantity,
                    });
                }
            }
        });

        await kv.put(cartId, JSON.stringify(carrito), {
            expirationTtl: 60 * 60 * 24 * 30
        });

        return new Response(JSON.stringify({ 
            success: true, 
            message: "Carrito actualizado",
            items: carrito.items 
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Error al actualizar el carrito" }), { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const cartId = url.searchParams.get("cart");

        if (!cartId) {
            return new Response(JSON.stringify({ error: "CartId no proporcionado" }), { status: 400 });
        }

        const kv = (getCloudflareContext().env as CloudflareEnv).huertabeja_cart;
        
        if (!kv) {
            return new Response(JSON.stringify({ error: "KV no disponible" }), { status: 500 });
        }

        const body: { id: string } = await request.json();

        if (!body.id) {
            return new Response(JSON.stringify({ error: "ID de producto no proporcionado" }), { status: 400 });
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

        // Filtrar el producto a eliminar
        const initialLength = carrito.items.length;
        carrito.items = carrito.items.filter(item => item.id !== body.id);

        // Verificar si se eliminó algo
        if (carrito.items.length === initialLength) {
            return new Response(JSON.stringify({ 
                error: "Producto no encontrado en el carrito" 
            }), { status: 404 });
        }

        // Guardar carrito actualizado en KV
        await kv.put(cartId, JSON.stringify(carrito), {
            expirationTtl: 60 * 60 * 24 * 30
        });

        return new Response(JSON.stringify({ 
            success: true, 
            message: "Producto eliminado del carrito",
            items: carrito.items 
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Error al eliminar producto del carrito" }), { status: 500 });
    }
}