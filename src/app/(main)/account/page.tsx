import * as Styles from "@/styles/pages/account-style"
import Link from "next/link";
import { Suspense } from "react";
import EmailText from "./emailtext";
import Dropdowm from "./dropdown";
import Tabs from "./tabs";

export const metadata = {
    title: 'Mi Cuenta - Huertabeja',
    description: 'Gestiona tu cuenta de Huertabeja, cambia tu correo, contraseña y direcciones de envío.',
}

export default function AccountPage({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
    return (
        <Styles.Container>
            <Styles.HeaderContent>
                <Styles.TitlePage>Mi Cuenta</Styles.TitlePage>
                <Dropdowm>
                    <Styles.Dropdowm>
                        <Styles.TitleMenu>Menú</Styles.TitleMenu>
                    </Styles.Dropdowm>
                </Dropdowm>
            </Styles.HeaderContent>
            <Styles.Main>
                <Suspense fallback={<p>Cargando menu...</p>}>
                    <Tabs searchParams={searchParams} />
                </Suspense>

                {(!searchParams.tab || searchParams.tab === "email") && (
                    <Styles.Content>
                        <Styles.TitleTab>Correo</Styles.TitleTab>
                        <Styles.SubTitleTab>
                            Cambia la dirección de correo que utilizas para acceder
                            a Huertabeja
                        </Styles.SubTitleTab>

                        <Styles.SubTitleTab weight={500} mt={20}>Correo Actual:</Styles.SubTitleTab>
                        <Suspense fallback={<Styles.EmailLoading />}>
                            <Styles.EmailText>
                                <EmailText />
                            </Styles.EmailText>
                        </Suspense>

                        <Styles.ButtonContainer>
                            <Styles.Button>Cambiar Correo Electronico</Styles.Button>
                        </Styles.ButtonContainer>
                    </Styles.Content>
                )}

                {searchParams.tab === "password" && (
                    <Styles.Content>
                        <Styles.TitleTab>Cambiar contraseña</Styles.TitleTab>
                        <Styles.SubTitleTab>
                            Cambiar tu contraseña cerrará tu sesión en otros dispositivos. Tendrás que introducir en ellos tu nueva contraseña para acceder de nuevo a tu cuenta.
                        </Styles.SubTitleTab>

                        <Styles.ButtonContainer>
                            <Link href="/account/reset-password">
                                <Styles.Button>Cambiar contraseña</Styles.Button>
                            </Link>
                        </Styles.ButtonContainer>
                    </Styles.Content>
                )}

                {searchParams.tab === "delivery" && (
                    <Styles.Content>
                        <Styles.TitleTab>Mis direcciones</Styles.TitleTab>
                        <Styles.SubTitleTab>
                            Aquí puedes gestionar tus direcciones de envío.
                        </Styles.SubTitleTab>
                    </Styles.Content>
                )}
            </Styles.Main>
        </Styles.Container>
    );
}
