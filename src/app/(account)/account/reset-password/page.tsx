import * as Styles from "@/styles/pages/login-style";
import Image from "next/image";
import { Alert } from "@/components/common/Alert";
import FormReset from "./form-reset";

export default async function ResetPassword() {
  return (
    <Styles.Container>
      <Alert />
      <Styles.Content>
        <Styles.LeftSide>
          <Styles.LeftContent width="455px">
            <Styles.LogoContent>
              <Image src="/logo.png" alt="Logo" width={220} height={70} />
            </Styles.LogoContent>
            <Styles.TextH1>Reiniciar contraseña</Styles.TextH1>
            <p>Se enviará un correo para reiniciar tu contraseña a tu dirección de email.</p>
            <FormReset />
          </Styles.LeftContent>
        </Styles.LeftSide>
        <Styles.ImageContainer
          height="550px"
          queries={[
            { break: 1600, css: "height: 450px;" },
            { break: 1400, css: "height: 380px;" },
            { break: 1200, css: "display: none;" },
          ]}
        >
          <img
            src="/candado.webp"
            alt="Candado"
          />
        </Styles.ImageContainer>
      </Styles.Content>
    </Styles.Container>
  );
}
