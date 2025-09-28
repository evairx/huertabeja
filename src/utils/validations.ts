export function validateEmail(email: string): string | null {
  if (!email) return "El campo email es obligatorio";

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "Formato de email inválido";

  const allowedDomains = ["gmail.com", "outlook.com", "proton.me", "duocuc.cl"];

  const domain = email.split("@")[1];
  if (!allowedDomains.includes(domain)) {
    return "Correo no admitido";
  }

  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "El campo contraseña es obligatorio";
  if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres";
  return null;
}