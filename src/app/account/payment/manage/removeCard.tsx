"use client";
import * as Styles from "@/styles/pages/payment-manage";
import { Overlay } from "@/styles/cart-style";
import { useState } from "react";
import { removeCard } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function RemoveCard({ id, cardId }: { id: string, cardId?: number }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleRemoveCard = async (id: string, cardId: number) => {
        setOpen(false);
        setIsLoading(true);
        const res = await removeCard(id, cardId);
        console.log(res);

        if (res.status === 200) {
            router.refresh();
        }

        setIsLoading(false);
    }

    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        isLoading ? (
            <Styles.Loading/>
        ) : (
            <>
                <Styles.ButtonTrash
                    onClick={handleOpen}
                />
                <Styles.ContainerInputs open={open}>
                    <Styles.ContentInputs>
                        <Styles.TitleInputs>¿Estás seguro de que deseas eliminar esta tarjeta?</Styles.TitleInputs>
                        <Styles.ButtonDisplay>
                            <Styles.Button onClick={() => cardId !== undefined && handleRemoveCard(id, cardId)}>Eliminar</Styles.Button>
                            <Styles.ButtonCancel onClick={handleOpen}>Cancelar</Styles.ButtonCancel>
                        </Styles.ButtonDisplay>
                    </Styles.ContentInputs>
                </Styles.ContainerInputs>
                <Overlay open={open}/>
            </>
        )
    );
}