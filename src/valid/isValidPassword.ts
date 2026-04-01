import CnilPasswordChecker from "./CnilPasswordChecker";

/**
 * Vérifie si un mot de passe respecte les recommandations CNIL 2022.
 */
export function isValidPassword(password: string): boolean {
  const checker = new CnilPasswordChecker();
  checker.pwd = password;
  return checker.isValid;
}

