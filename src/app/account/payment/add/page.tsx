import type { Metadata } from "next";
import * as Styles from "@/styles/pages/payment-manage"
import { Content, LeftSide, ImageContainer } from "@/styles/pages/login-style"
import FormAdd from "./formadd";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Agregar método de pago - Huertabeja',
}

export default async function PaymentManagePage() {
    return (
        <Styles.Container>
            <Styles.Header>
                <Image src="/logo.png" alt="Manage Payment" width={240} height={70} />
            </Styles.Header>
            <Content height="87dvh">
                <LeftSide>
                    <Styles.Main width="550px">
                        <Styles.Title>Crear método de pago</Styles.Title>
                        <FormAdd />
                    </Styles.Main>
                </LeftSide>
                <ImageContainer height="500px">
                    <img
                        src="/billetera.webp"
                        alt="Persona con planta"
                    />
                </ImageContainer>
            </Content>
        </Styles.Container>
    );
}