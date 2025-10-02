"use client";

import * as Styles from "@/styles/menu-home-style";
import { useEffect, useState, useCallback, useRef } from "react";
import { getSession, signOut } from "@/app/actions";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function ButtonLogin() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const fetchUser = useCallback(async () => {
        setLoading(true);

        try {
            const res = await getSession();

            if (res?.status === 200) {
                setUser(res.body?.data);
            }
        } catch (error) {
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
            router.push('/account/login');
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
                <Styles.OptionsItem onClick={toggleMenu}>
                    <Link href="/account">Mi Cuenta</Link>
                </Styles.OptionsItem>
                <Styles.OptionsItem onClick={toggleMenu}>
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
