"use client";
import * as Styles from "@/styles/pages/login-style";
import { useContext, useState } from "react";
import { signIn } from "@/app/actions";
import { AlertContext } from "@/context/alert-context";
import Link from "next/link";

export default function FormLogin() {
  const { showAlert } = useContext(AlertContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState<boolean | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<boolean | undefined>(undefined);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Loading) return;
    setLoading(true);
    setEmailError(undefined);
    setPasswordError(undefined);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await signIn(formData);

    if (res && res.status === 400) {
      setLoading(false);
      if (res.body?.error?.toLowerCase().includes("email")) {
        showAlert(res.body?.error || "Error en el formulario");
        setEmailError(true);
      } else if (res.body?.error?.toLowerCase().includes("contraseña")) {
        showAlert(res.body?.error || "Error en el formulario");
        setPasswordError(true);
      } else if (res.body?.error?.toLowerCase().includes("invalid login credentials")) {
        showAlert("Credenciales inválidas");
        setEmailError(true);
        setPasswordError(true);
      }
    }

    console.log(res.body.data?.session.access_token);
    console.log(res.body.data?.session.refresh_token);
    setLoading(false);
  };

  return (
    <Styles.FormContainer onSubmit={handleLogin}>
      <div>
        <Styles.LabelText>EMAIL</Styles.LabelText>
        <Styles.Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          emailError={emailError}
        />
      </div>

      <div>
        <Styles.LabelText>CONTRASEÑA</Styles.LabelText>
        <Styles.Input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          passwordError={passwordError}
        />
      </div>

      <div>
        <Styles.ForgotPassword>
          <Link href="/reset-password">¿Olvidaste tu contraseña?</Link>
        </Styles.ForgotPassword>
      </div>

      <Styles.ButtonSignIn type="submit">
        {!Loading && "Acceder"}
        {Loading && <Styles.Loading color={"#fff"} secondColor={"#01700eff"}/>}
      </Styles.ButtonSignIn>
    </Styles.FormContainer>
  );
}
