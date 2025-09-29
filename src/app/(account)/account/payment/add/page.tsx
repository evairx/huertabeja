import type { Metadata } from "next";
import * as Styles from "@/styles/pages/payment-manage"
import { Content, LeftSide, ImageContainer } from "@/styles/pages/login-style"
import { Alert } from '@/components/common/Alert';
import FormAdd from "./formadd";
import Image from "next/image";

export const metadata: Metadata = {
    title: 'Agregar método de pago - Huertabeja',
}

export default async function PaymentManagePage() {
    return (
        <Styles.Container>
            <Alert />
            <Styles.Header>
                <Image src="/logo.png" alt="Manage Payment" width={240} height={70} />
            </Styles.Header>
            <Content 
                height="87dvh"
                queries={[
                    { break: 1600, css: "height: 85dvh;" },
                ]}
            >
                <LeftSide>
                    <Styles.Main width="550px">
                        <Styles.Title>Crear método de pago</Styles.Title>
                        <FormAdd />
                    </Styles.Main>
                </LeftSide>
                <ImageContainer
                    height="500px"
                    queries={[
                        { break: 1600, css: "height: 450px;" },
                        { break: 1400, css: "height: 380px;" },
                        { break: 1200, css: "display: none;" },
                    ]}
                >
                    <img
                        src="/billetera.webp"
                        alt="Persona con planta"
                    />
                </ImageContainer>
            </Content>
        </Styles.Container>
    );
}