import * as Styles from "@/styles/pages/account-style"
import Link from "next/link";
import { Suspense } from "react";
import EmailText from "./emailtext";
import Dropdowm from "./dropdown.tsx";
import { getSession } from "@/app/actions"

export const metadata = {
    title: 'Mi Cuenta - Huertabeja',
    description: 'Gestiona tu cuenta de Huertabeja, cambia tu correo, contraseña y direcciones de envío.',
}

export default async function AccountPage({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
    const session = await getSession();
  
  const menuOptions = {
        general: [
            { name: "Email", href: "/account", current: !searchParams.tab || searchParams.tab === "email" },
            { name: "Contraseña", href: "/account?tab=password", current: searchParams.tab === "password" },
            { name: "Mis direcciones", href: "/account?tab=delivery", current: searchParams.tab === "delivery" },
        ],
        purchases: [
            { name: "Mis pedidos", href: "/account/orders", current: searchParams.tab === "orders" },
            { name: "Mis metodos de pagos", href: "/account/payment/manage", current: searchParams.tab === "payment" },
        ],
    }

    const panelOption = {
    
    }

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
                <Styles.Menu>
                    <Styles.TitleMenu>General</Styles.TitleMenu>
                    <Styles.OptionsContent>
                        {menuOptions && menuOptions.general.map((option) => (
                            <Link key={option?.name} href={option?.href}>
                                <Styles.Option key={option?.name} current={option?.current}>
                                    {option?.name}
                                </Styles.Option>
                            </Link>
                        ))}
                    </Styles.OptionsContent>

                    <Styles.TitleMenu>Compras</Styles.TitleMenu>
                    <Styles.OptionsContent>
                        {menuOptions.purchases.map((option) => (
                            <Link key={option.name} href={option.href}>
                                <Styles.Option key={option.name} current={option.current}>
                                    {option.name}
                                </Styles.Option>
                            </Link>
                        ))}
                    </Styles.OptionsContent>
                </Styles.Menu>

                {(!searchParams.tab || searchParams.tab === "email") && (
                    <Styles.Content>
                        <Styles.TitleTab>Email</Styles.TitleTab>
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
