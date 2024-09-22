"use client";
import Link from "next/link";
import module from "./Header.module.css";
import useStore from "@/services/store";
import { useEffect } from "react";

export default function Header(): JSX.Element {
  const setLoginModal = useStore((state) => state.setLoginModal);
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      if (token) setUser(token);
      else setLoginModal(true);
    }
  }, [user]);
  return (
    <header className={module.header}>
      <div className={module.content}>
        <Link href={"/"}>
          <img src="/logo.svg" alt="logo" className={module.logo} />
        </Link>
        <nav>
          <Link href={"/popular"}>Popular</Link>
          <Link href={"/favorites"}>Favorites</Link>
        </nav>
        {user ? (
          <img src="/icon_user_loged.svg" alt="user" className={module.user} />
        ) : (
          <img
            src="/icon_user.svg"
            alt="user"
            className={module.user}
            onClick={() => setLoginModal(true)}
          />
        )}
      </div>
    </header>
  );
}
