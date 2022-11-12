const STORAGE_KEY_EMAIL = "aws-cognito-react-starter-email";

export function getEmailAddress() {
  return localStorage.getItem(STORAGE_KEY_EMAIL) || "";
}

export function setEmailAddress(email: string) {
  localStorage.setItem(STORAGE_KEY_EMAIL, email);
}
