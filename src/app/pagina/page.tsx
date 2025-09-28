// app/cards/page.tsx
import CardsForm from "./cardlist"

type CardsFormProps = {
  customerId: string;
  cards: any[];
};

// Server Component
async function getSavedCards(customerId: string) {
  const res = await fetch(`https://api.mercadopago.com/v1/customers/${customerId}/cards`, {
    headers: {
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al traer tarjetas guardadas");
  const data = await res.json();
  return data as CardsFormProps[];
}

export default async function CardsPage() {
  const customerId = "2717180738-w0eOVC8NNxKdby"; // reemplazar por el real
  const cards: any[] = await getSavedCards(customerId);

  return (
    <div>
      <h1>Mis tarjetas guardadas</h1>
      <CardsForm customerId={customerId} cards={cards} />
    </div>
  );
}
