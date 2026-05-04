/**
 * Mesma política do backend (cadastro / nova senha / alterar senha).
 */
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

export const PASSWORD_POLICY_MESSAGE =
  'A senha deve ter pelo menos 6 caracteres, incluindo pelo menos uma letra maiúscula e um número.';

export function validatePassword(password) {
  if (password == null) return false;
  const s = String(password).trim();
  if (!s) return false;
  return PASSWORD_REGEX.test(s);
}
