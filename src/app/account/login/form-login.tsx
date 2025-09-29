"use client";

import * as Styles from "@/styles/pages/login-style";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { signIn, setSession } from "@/app/actions";
import { AlertContext } from "@/context/alert-context";
import { validateEmail, validatePassword } from "@/utils/validations";
import Link from "next/link";

export default function FormLogin() {
  const { showAlert } = useContext(AlertContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState<boolean | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<boolean | undefined>(undefined);

  const resetErrors = () => {
    setEmailError(undefined);
    setPasswordError(undefined);
  };

  const handleError = (error: string) => {
    const msg = error.toLowerCase();

    switch (msg) {
      case msg.includes("email") && msg:
        showAlert(error || "El campo email es obligatorio");
        setEmailError(true);
        break;
      case msg.includes("contraseña") && msg:
        showAlert(error || "El campo contraseña es obligatorio");
        setPasswordError(true);
        break;
      case msg.includes("invalid login credentials") && msg:
        showAlert("Credenciales inválidas");
        setEmailError(true);
        setPasswordError(true);
        break;
      default:
        showAlert("Error desconocido");
        break;
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    resetErrors();

    const emailErrorMsg = validateEmail(email);

    if (emailErrorMsg) {
      showAlert(emailErrorMsg);
      setEmailError(true);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await signIn(formData);

    if (!res) {
      setLoading(false);
      showAlert("Error de conexión");
      return;
    }

    if (res.status === 400 && res.body?.error) {
      handleError(res.body.error);
      setLoading(false);
      return;
    }

    if (res.status === 200 && res.body?.data?.session) {
      const session = res.body.data.session;
      const expiresAt = session.expires_at ?? 0;

      const sessionRes = await setSession(
        session.access_token,
        session.refresh_token,
        expiresAt
      );

      if (sessionRes.status === 200) {
        router.push("/account");
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <Styles.FormContainer onSubmit={handleLogin}>
      <div>
        <Styles.LabelText>EMAIL</Styles.LabelText>
        <Styles.InputContainer>
          <Styles.Input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            emailError={emailError}
          />
          <Styles.IconMail focus={isFocused} active={email.length > 0} emailError={emailError} />
        </Styles.InputContainer>
      </div>

      <div>
        <Styles.LabelText>CONTRASEÑA</Styles.LabelText>
        <Styles.InputContainer>
          <Styles.Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsFocusedPass(true)}
            onBlur={() => setIsFocusedPass(false)}
            passwordError={passwordError}
          />
          <Styles.IconPassword focus={isFocusedPass} active={password.length > 0} />
          <Styles.IconEye active={password.length > 0} showPassword={showPassword} onClick={() => setShowPassword(!showPassword)} />
        </Styles.InputContainer>
      </div>

      <div>
        <Styles.ForgotPassword>
          <Link href="/account/reset-password">¿Olvidaste tu contraseña?</Link>
        </Styles.ForgotPassword>
      </div>

      <Styles.ButtonSignIn type="submit">
        {loading ? <Styles.Loading color="#fff" secondColor="#01700eff" /> : "Acceder"}
      </Styles.ButtonSignIn>

      <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Styles.ForgotPassword>
          <Link href="/account/register">¿No tienes una cuenta?, Regístrate</Link>
        </Styles.ForgotPassword>
      </div>
    </Styles.FormContainer>
  );
}
