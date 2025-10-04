import * as Styles from "@/styles/pages/account-style"
import { getSession } from "@/app/actions"
import Link from "next/link";

export default async function Tabs({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
    const session = await getSession()

    const menuOptions = {
        general: [
            { name: "Correo", href: "/account", current: !searchParams.tab || searchParams.tab === "email" },
            { name: "Contraseña", href: "/account?tab=password", current: searchParams.tab === "password" },
            { name: "Mis direcciones", href: "/account?tab=delivery", current: searchParams.tab === "delivery" },
        ],
        purchases: [
            { name: "Mis pedidos", href: "/account/orders", current: null },
            { name: "Mis metodos de pagos", href: "/account/payment/manage", current: null },
        ],
    }

    if (session?.body?.rol?.perms?.includes("panel_access")) {
        menuOptions.general.unshift({ name: "Panel de control", href: "/dashboard", current: false });
    }

    return (
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
                        <Styles.Option key={option.name} current={option?.current}>
                            {option.name}
                        </Styles.Option>
                    </Link>
                ))}
            </Styles.OptionsContent>
        </Styles.Menu>
    )
}