import * as Styles from "@/styles/pages/login-style";
import Image from "next/image";
import { Alert } from "@/components/common/Alert";
import FormUpdate from "./form-update";

export default async function UpdatePassword() {
  return (
    <Styles.Container>
      <Alert />
      <Styles.Content>
        <Styles.LeftSide>
          <Styles.LeftContent width="450px">
            <Styles.LogoContent>
              <Image src="/logo.png" alt="Logo" width={220} height={70} />
            </Styles.LogoContent>   
            <Styles.TextH1>Actualizar contraseña</Styles.TextH1>
            <FormUpdate />
          </Styles.LeftContent>
        </Styles.LeftSide>
        <Styles.ImageContainer height="550px">
          <img
            src="/candado.webp"
            alt="Candado"
          />
        </Styles.ImageContainer>
      </Styles.Content>
    </Styles.Container>
  );
}
