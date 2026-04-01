/**
 * Représente une règle de mot de passe avec son statut de conformité.
 */
export type PasswordRule = {
  /** Identifiant technique de la règle (ex. "minLength"). */
  key: string;
  /** Libellé lisible par l'utilisateur (ex. "Au moins 12 caractères"). */
  label: string;
  /** `true` si la règle est respectée pour le mot de passe courant. */
  ok: boolean;
};

/**
 * Vérifie la conformité d'un mot de passe selon les recommandations CNIL 2022.
 *
 * Règles appliquées (option A CNIL 2022 — sans double authentification) :
 * - Au moins 12 caractères
 * - Au moins 1 lettre majuscule
 * - Au moins 1 lettre minuscule
 * - Au moins 1 chiffre
 * - Au moins 1 caractère spécial
 */
export default class CnilPasswordChecker {
  private _pwd = "";

  /** Définitions statiques des règles (sans le champ `ok`, calculé à la volée). */
  private static readonly RULE_DEFS: Omit<PasswordRule, "ok">[] = [
    { key: "minLength", label: "Au moins 12 caractères" },
    { key: "hasUppercase", label: "Au moins 1 lettre majuscule" },
    { key: "hasLowercase", label: "Au moins 1 lettre minuscule" },
    { key: "hasDigit", label: "Au moins 1 chiffre" },
    { key: "hasSpecial", label: "Au moins 1 caractère spécial (!@#$…)" },
  ];

  /** Définit le mot de passe à évaluer. */
  set pwd(value: string) {
    this._pwd = value;
  }

  /** Retourne toutes les règles avec leur statut courant. */
  get rules(): PasswordRule[] {
    return CnilPasswordChecker.RULE_DEFS.map(({ key, label }) => ({
      key,
      label,
      ok: this.checkRule(key),
    }));
  }

  /** Retourne les libellés des règles non respectées. */
  get errors(): string[] {
    return this.rules.filter((rule) => !rule.ok).map((rule) => rule.label);
  }

  /** Retourne les libellés des règles respectées. */
  get successes(): string[] {
    return this.rules.filter((rule) => rule.ok).map((rule) => rule.label);
  }

  /** `true` si toutes les règles CNIL sont respectées. */
  get isValid(): boolean {
    return this.rules.every((rule) => rule.ok);
  }

  /** Évalue une règle individuelle sur `_pwd`. */
  private checkRule(key: string): boolean {
    switch (key) {
      case "minLength":
        return this._pwd.length >= 12;
      case "hasUppercase":
        return /[A-Z]/.test(this._pwd);
      case "hasLowercase":
        return /[a-z]/.test(this._pwd);
      case "hasDigit":
        return /[0-9]/.test(this._pwd);
      case "hasSpecial":
        return /[^A-Za-z0-9]/.test(this._pwd);
      default:
        return false;
    }
  }
}

