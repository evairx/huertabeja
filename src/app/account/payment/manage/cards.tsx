import { getSupabaseClient } from "@/libs/supabase";
import * as Styles from "@/styles/pages/payment-manage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RemoveCard from "./removeCard";
import ClientRefresher from "@/components/client/ClientRefresher";

export async function Cards() {
    const cookiesStore = await cookies();
    const access_token = cookiesStore.get("access_token")?.value;
    const refresh_token = cookiesStore.get("refresh_token")?.value;

    if (!access_token) {
        return (
            <ClientRefresher>
                <div>Recargando...</div>
            </ClientRefresher>
        );
    }

    if (!refresh_token) {
        redirect('/account/login');
    }

    const supabase = getSupabaseClient();

    await supabase.auth.setSession({
        access_token: access_token,
        refresh_token: refresh_token,
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return <div>User not found.</div>;
    }

    const { data: cards, error } = await supabase
        .from("payment_card_users")
        .select("*")
        .eq("user_id", user.id);

    function transformCardNmae(name: string) {
        const names = {
            'MASTER': 'MASTERCARD',
            'DEBMASTER': 'MASTERCARD',
            'VISA': 'VISA',
            'DEBVISA': 'VISA',
        }

        return names[name as keyof typeof names] || name;
    }

    return (
        <Styles.ContainerCards>
            {cards && cards.length > 0 ? (
                <>
                    {cards.map((card) => (
                        <Styles.Card key={card.id}>
                            <Styles.CardSvg />
                            <Styles.CardText>
                                {transformCardNmae(card.title)} termina en {card.last_four_digits}
                            </Styles.CardText>
                            <RemoveCard id={card.id} cardId={card.card_id}/>
                        </Styles.Card>
                    ))}
                </>
            ) : (
                <div>No tienes ninguna tarjeta guardada.</div>
            )}
        </Styles.ContainerCards>
    );
}