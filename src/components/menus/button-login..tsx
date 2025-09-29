"use client";

import * as Styles from "@/styles/menu-home-style";
import ClientRefresher from "@/components/client/ClientRefresher";
import { useEffect, useState, useCallback, useRef } from "react";
import { getSession, isLogged, signOut } from "@/app/actions";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function ButtonLogin() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [refresh, setRefresh] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const fetchUser = useCallback(async () => {
        setLoading(true);
        setRefresh(false);

        try {
            const logged = await isLogged();
            if (logged.body?.isLogged) {
                const res = await getSession();
                if (res?.status === 200) {
                    setUser(res.body?.data);
                } else {
                    setRefresh(true);
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            setRefresh(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    if (refresh) {
        return (
            <ClientRefresher onSuccess={fetchUser}>
                <Styles.AvatarLoading />
            </ClientRefresher>
        );
    }

    if (loading) return <Styles.AvatarLoading />;

    function shortName(name: string) {
        if (!name) return "";
        return name.trim().split(" ")[0];
    }


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const handleSignOut = async () => {
        const res = await signOut();
        if (res?.status === 200) {
            setUser(null);
            router.refresh();
        }
    };

    return user ? (
        <Styles.UserContainer ref={menuRef}>
            <Styles.AvatarContainer onClick={toggleMenu}>
                <Styles.Avatar>
                    <Styles.AvatarImage
                        src={user.avatar ? user.avatar : "/default-avatar.webp"}
                        alt={user.name}
                    />
                </Styles.Avatar>
                <Styles.UserName>{shortName(user.name)}</Styles.UserName>
            </Styles.AvatarContainer>
            <Styles.OptionsMenu open={menuOpen}>
                <Styles.OptionsItem>
                    <Link href="/account/profile">Perfil</Link>
                </Styles.OptionsItem>
                <Styles.OptionsItem>
                    <Link href="/account/orders">Mis Pedidos</Link>
                </Styles.OptionsItem>
                <Styles.OptionsItem onClick={handleSignOut}>
                    <p>Cerrar Sesión</p>
                </Styles.OptionsItem>
            </Styles.OptionsMenu>

        </Styles.UserContainer>
    ) : (
        <Link href="/account/login">
            <Styles.TextLogin>Acceder</Styles.TextLogin>
        </Link>
    );
}
