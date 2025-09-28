import type { Metadata } from "next";
import * as Styles from "@/styles/pages/payment-manage"
import Image from "next/image";
import FormAdd from "./formadd";

export const metadata: Metadata = {
    title: 'Agregar Método de Pago - Huertabeja',
}

export default function PaymentManagePage() {
    return (
        <Styles.Container>
            <Styles.Header>
                <Image src="/logo.png" alt="Manage Payment" width={240} height={70} />
            </Styles.Header>
            <Styles.Main>
                <Styles.Title>Agregar un método de pago</Styles.Title>
                <FormAdd />
            </Styles.Main>
        </Styles.Container>
    );
}