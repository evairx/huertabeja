import { getSupabaseClient } from "@/libs/supabase";
import * as Styles from "@/styles/pages/payment-manage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RemoveCard from "./removeCard";

export async function Cards() {
    const cookiesStore = await cookies();
    const access_token = cookiesStore.get("sid")?.value;
    const refresh_token = cookiesStore.get("rid")?.value;

    if (!refresh_token) {
        redirect('/account/login');
    }

    const supabase = getSupabaseClient();

    await supabase.auth.setSession({
        access_token: access_token || '',
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
                            <RemoveCard id={card.id} cardId={card.card_id} />
                        </Styles.Card>
                    ))}
                </>
            ) : (
                <Styles.Card>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Styles.CardText>No tienes métodos de pago guardados.</Styles.CardText>
                    </div>
                </Styles.Card>
            )}
        </Styles.ContainerCards>
    );
}