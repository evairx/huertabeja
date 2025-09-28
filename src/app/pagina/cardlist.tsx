"use client";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

interface Card {
  id: string;
  last_four_digits: string;
  payment_method: { name: string };
}

interface CardsFormProps {
  customerId: string;
  cards: Card[];
}

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CardItem = styled.div<{ selected: boolean }>`
  border: 2px solid ${({ selected }) => (selected ? "#01700e" : "#ddd")};
  border-radius: 12px;
  padding: .900rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: ${({ selected }) => (selected ? "#f0f9f0" : "#fff")};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CardLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const CardDetails = styled.div`
  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: #333;
  }
  
  p {
    margin: 0.25rem 0 0;
    color: #666;
  }
`;

const SecurityCodeContainer = styled.div<{ visible: boolean }>`
  margin: 1.5rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  display: ${({ visible }) => (visible ? "block" : "none")};
  transition: all 0.3s ease;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #01700e;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #015c0b;
  }
`;

export default function CardsForm({ customerId, cards }: CardsFormProps) {
  const [mp, setMp] = useState<any>(null);
 const [selectedCard, setSelectedCard] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;

    script.onload = () => {
      if (!window.MercadoPago) return console.error("MercadoPago SDK no disponible");

      const mercadoPago = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
        locale: "es-CL",
      });
      
      mercadoPago.fields.create("securityCode", { 
        placeholder: "CVV"
      }).mount("securityCode-container");

      setMp(mercadoPago);
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mp) return alert("SDK aún no cargado");
    if (!selectedCard) return alert("Selecciona una tarjeta");

    setLoading(true);
    try {
      const token = await mp.fields.createCardToken({ cardId: selectedCard });
      console.log("TOKEN generado:", token.id);
    } catch (err) {
      console.error("Error creando token:", err);
      alert("Error tokenizando tarjeta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="form-checkout">
      <CardGrid>
        {cards.map((card) => (
          <CardItem
            key={card.id}
            selected={selectedCard === card.id}
            onClick={() => setSelectedCard(card.id)}
          >
            <CardInfo>
              <CardDetails>
                <h3>{card.payment_method.name.toUpperCase()} ending in {card.last_four_digits}</h3>
              </CardDetails>
            </CardInfo>
          </CardItem>
        ))}
      </CardGrid>

      <SecurityCodeContainer visible={!!selectedCard}>
        <div id="securityCode-container" />
      </SecurityCodeContainer>

      <SubmitButton type="submit" disabled={loading || !selectedCard}>
        {loading ? "Procesando..." : "Pagar con esta tarjeta"}
      </SubmitButton>
    </form>
  );
}