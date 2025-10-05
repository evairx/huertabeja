"use client";

import * as Styles from "@/styles/menu-home-style";
import { useEffect, useState, useCallback, useRef } from "react";
import { getSession, signOut } from "@/app/actions";
import { useRouter } from "next/navigation";
import { getReturnUrl } from "@/utils/get-return-url";

import Link from "next/link";

export default function ButtonUser() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { path } = getReturnUrl();

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
            router.push(path);
        }
    };

    return (
        <Styles.UserContainer ref={menuRef}>
            <Styles.AvatarContainer onClick={toggleMenu}>
                <Styles.Avatar>
                    <Styles.AvatarImage
                        src={user.avatar ? user.avatar : "/default-avatar.webp"}
                        alt={user.name}
                    />
                </Styles.Avatar>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Styles.UserName>{shortName(user.name)}</Styles.UserName>
                    <Styles.ChevronIcon open={menuOpen} />
                </div>
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
    )
}
