"use client";
import * as Styles from "@/styles/pages/login-style";
import { useContext, useState } from "react";
import { updatePassword } from "@/app/actions";
import { AlertContext } from "@/context/alert-context";

export default function FormUpdatePassword() {
  const { showAlert } = useContext(AlertContext);

  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(false);

  const [passwordError, setPasswordError] = useState<boolean | undefined>(undefined);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Loading) return;
    setLoading(true);
    setPasswordError(undefined);

    const formData = new FormData();
    formData.append("password", password);

    const res = await updatePassword(formData);

    if (res && res.status === 400) {
      setLoading(false);
      if (res.body?.error?.toLowerCase().includes("password")) {
        showAlert(res.body?.error || "Error en el formulario");
        setPasswordError(true);
      }
    }

    if (res && res.status === 200) {
      setSuccess(true);
      console.log(res);
    }

    setLoading(false);
  };

  return (
    <>
      {success ? (
        <p>La contraseña ha sido actualizada con éxito</p>
      ) : (
        <Styles.FormContainer onSubmit={handleReset}>
          <div>
            <Styles.LabelText>CONTRASEÑA</Styles.LabelText>
            <Styles.Input
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              passwordError={passwordError}
            />
          </div>

          <Styles.ButtonSignIn type="submit">
            {!Loading && "Actualizar"}
            {Loading && <Styles.Loading color={"#fff"} secondColor={"#01700eff"} />}
          </Styles.ButtonSignIn>
        </Styles.FormContainer>
      )}
    </>
  );
}
