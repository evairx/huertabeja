import type { Metadata } from "next";
import * as Styles from "@/styles/pages/payment-manage"
import { Content, LeftSide, ImageContainer } from "@/styles/pages/login-style"
import { Suspense } from "react";
import { Cards } from "./cards";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Iniciar sesión - Huertabeja',
}

export default async function PaymentManagePage() {
    return (
        <Styles.Container>
            <Styles.Header>
                <Image src="/logo.png" alt="Manage Payment" width={240} height={70} />
            </Styles.Header>
            <Content height="87dvh">
                <LeftSide width="900px">
                    <Styles.Main>
                        <Styles.Title>Mis métodos de pago</Styles.Title>
                        <Suspense fallback={<div>Cargando métodos de pago...</div>}>
                            <Cards />
                        </Suspense>
                        <Styles.ButtonContainer>
                            <Link href="/account/payment/add">
                                <Styles.ButtonAdd>AGREGAR NUEVA TARJETA</Styles.ButtonAdd>
                            </Link>
                        </Styles.ButtonContainer>
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