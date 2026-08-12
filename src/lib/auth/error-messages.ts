const messages: Record<string, string> = {
  invalid: "Invalid email or password.",
  "rate-limited": "Too many attempts. Please try again in a few minutes.",
  exists: "An account with this email already exists. Try signing in instead.",
};

export function authErrorMessage(code: string | undefined) {
  if (!code) return null;
  return messages[code] ?? "Something went wrong. Please try again.";
}
