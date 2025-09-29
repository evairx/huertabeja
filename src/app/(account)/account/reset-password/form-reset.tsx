"use client";
import * as Styles from "@/styles/pages/login-style";
import { useContext, useState } from "react";
import { sendResetPasswordEmail } from "@/app/actions";
import { AlertContext } from "@/context/alert-context";

export default function FormReset() {
  const { showAlert } = useContext(AlertContext);

  const [email, setEmail] = useState("");
  const [Loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(false);

  const [emailError, setEmailError] = useState<boolean | undefined>(undefined);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Loading) return;
    setLoading(true);
    setEmailError(undefined);

    const formData = new FormData();
    formData.append("email", email);

    const res = await sendResetPasswordEmail(formData);

    if (res && res.status === 400) {
      setLoading(false);
      if (typeof res.body === 'object' && res.body?.error?.toLowerCase().includes("email")) {
        showAlert(res.body.error || "Error en el formulario");
        setEmailError(true);
      }
    }

    if (res && res.status === 200) {
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <>
      {success ? (
        <p>Se ha enviado el enlace para el reinicio</p>
      ) : (
        <Styles.FormContainer onSubmit={handleReset}>
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

          <Styles.ButtonSignIn type="submit">
            {!Loading && "Enviar"}
            {Loading && <Styles.Loading color={"#fff"} secondColor={"#01700eff"} />}
          </Styles.ButtonSignIn>
        </Styles.FormContainer>
      )}
    </>
  );
}
