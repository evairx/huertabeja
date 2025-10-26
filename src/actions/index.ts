import { signInGoogle } from "./auth/sign-in-google"
import { callbackGoogle } from "./auth/callback-google"

export const server = {
  signInGoogle,
  callbackGoogle
}