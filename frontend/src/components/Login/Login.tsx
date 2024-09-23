/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import { useState } from "react";
import module from "./Login.module.css";
import useStore from "@/services/store";

export default function Login(): JSX.Element {
  const [user, setUser] = useState(false);
  const [register, setRegister] = useState(false);

  const loginModalState = useStore((state) => state.loginModal);
  const setLoginModal = useStore((state) => state.setLoginModal);

  const setUserStore = useStore((state) => state.setUser);

  const registerUser = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { email, password, confirmPassword } = event.currentTarget;
    if (password.value !== confirmPassword.value)
      return alert("Passwords do not match");
    fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 400) alert(data.message);
        else {
          alert("User created successfully");
        }
      });
  };

  const loginUser = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { email, password } = event.currentTarget;
    fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 400) alert("error logging in");
        else {
          if (typeof window !== "undefined") {
            window.localStorage.setItem("token", data.token as string);
            alert("User logged in successfully");
            setUserStore(data.token as string);
            setLoginModal(false);
          }
        }
      });
  };

  if (!loginModalState) return <></>;
  return (
    <div className={module.login + " appear"}>
      <div className={module.formContainer}>
        <div
          className={module.selector + " " + (user && module.active)}
          onClick={() => {
            setUser((prev) => !prev);
            setRegister(false);
          }}
        >
          <p>Sign up</p>
          <p>Log in</p>
          <div></div>
        </div>
        {user ? (
          <form className={module.form + " appear"} onSubmit={loginUser}>
            <input type="email" id="email" name="email" placeholder="Email" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <button>
              <p>continue</p>
              <img src="/icon_ticket.svg" alt="ticket" />
            </button>
          </form>
        ) : register ? (
          <form className={module.form + " appear"} onSubmit={registerUser}>
            <input type="email" id="email" name="email" placeholder="Email" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <button>
              <p>Register</p>
              <img src="/icon_ticket.svg" alt="ticket" />
            </button>
          </form>
        ) : (
          <button
            className="appear"
            onClick={() => setRegister((prev) => !prev)}
          >
            <p>Register with your Email</p>
            <img src="/icon_mail.svg" alt="mail" />
          </button>
        )}
        <p className={module.disclaimer}>
          For any questions, reach out to support@Quickbetdmovies.com
        </p>
      </div>
      <div className={module.info}>
        {user ? (
          <>
            <h1>Welcome back to Quickbet Movies!</h1>
            <p>
              🍿 Ready to dive into the world of unlimited entertainment? Enter
              your credentials and let the cinematic adventure begin!
            </p>
            <img src="/man_2.png" alt="user" />
          </>
        ) : (
          <>
            <h1>Welcome to Quickbet Movies!</h1>
            <p>
              🎬 Ready to unlock a universe of cinematic delights? Sign up now
              and start your journey with us!
            </p>
            <img src="/man_1.png" alt="user" />
          </>
        )}
      </div>
      <div className={module.return} onClick={() => setLoginModal(false)}>
        <img src="/return.svg" alt="return" />
        <strong>Back</strong>
      </div>
    </div>
  );
}
