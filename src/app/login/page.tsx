import * as Styles from "@/styles/pages/login-style";
import ButtonGoogleLogin from "./button-google-login";

export default function Login() {
  return (
    <Styles.Container>
      <Styles.Content>
        <Styles.LeftSide>
          <Styles.LeftContent>
            <Styles.TextH1>Iniciar sesión</Styles.TextH1>
            <ButtonGoogleLogin />
            <Styles.Divider>O</Styles.Divider>
          </Styles.LeftContent>
        </Styles.LeftSide>
        <Styles.ImageContainer>
          <img
            src="/persona.webp"
            alt="Persona con planta"
          />
        </Styles.ImageContainer>
      </Styles.Content>
    </Styles.Container>
  );
}
