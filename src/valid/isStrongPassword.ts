import CnilPasswordChecker from "./CnilPasswordChecker";

/**
 * Vérifie si un mot de passe est suffisamment fort
 * selon les recommandations CNIL 2022.
 */
export function isStrongPassword(password: string): boolean {
  const checker = new CnilPasswordChecker();
  checker.pwd = password;
  return checker.isValid;
}

