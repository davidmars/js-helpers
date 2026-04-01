/**
 * Représente une règle de mot de passe avec son statut de conformité.
 */
export type PasswordRule = {
  /** Identifiant technique de la règle (ex. `"minLength"`). */
  key: string;
  /** Libellé lisible par l'utilisateur (ex. `"Au moins 12 caractères"`). */
  label: string;
  /** `true` si la règle est respectée pour le mot de passe courant. */
  ok: boolean;
};

/** Langues supportées pour les libellés des règles. */
export type Lang = "fr" | "en" | "es" | "de" | "it";

/**
 * Code de langue : les 5 langues intégrées avec autocomplétion,
 * ou n'importe quelle chaîne pour une langue ajoutée via {@link CnilPasswordChecker.addLang}.
 *
 * Le type `string & {}` préserve l'autocomplétion sur les valeurs connues
 * tout en acceptant des valeurs arbitraires.
 */
export type LangCode = Lang | (string & {});

/**
 * Clés canoniques des règles, dans leur ordre d'affichage.
 * Déclarée au niveau module pour permettre la dérivation du type {@link RuleKey}.
 */
const RULE_KEYS = [
  "minLength",
  "hasUppercase",
  "hasLowercase",
  "hasDigit",
  "hasSpecial",
] as const;

/** Union des identifiants de règles valides. */
export type RuleKey = typeof RULE_KEYS[number];

/**
 * Map clé de règle → libellé pour une langue personnalisée.
 * Toutes les clés sont optionnelles : une clé absente utilise l'identifiant technique
 * comme libellé de secours.
 */
export type LangTranslations = Partial<Record<RuleKey, string>>;

/**
 * Vérifie la conformité d'un mot de passe selon les recommandations CNIL 2022.
 *
 * Classe purement logique, sans aucune dépendance DOM.
 *
 * Règles appliquées (option A CNIL 2022 — sans double authentification) :
 * - Au moins 12 caractères
 * - Au moins 1 lettre majuscule
 * - Au moins 1 lettre minuscule
 * - Au moins 1 chiffre
 * - Au moins 1 caractère spécial
 */
export default class CnilPasswordChecker {
  private _pwd: string = "";

  /** Langue courante utilisée pour les libellés. */
  private static _lang: LangCode = "fr";

  /**
   * Traductions des libellés de règles pour chaque langue.
   * Alimenté exclusivement via {@link addLang}.
   */
  private static readonly TRANSLATIONS: Record<string, Omit<PasswordRule, "ok">[]> = {};

  /** Enregistrement des 5 langues intégrées via {@link addLang}. */
  static {
    CnilPasswordChecker.addLang("fr", {
      minLength: "Au moins 12 caractères",
      hasUppercase: "Au moins 1 lettre majuscule",
      hasLowercase: "Au moins 1 lettre minuscule",
      hasDigit: "Au moins 1 chiffre",
      hasSpecial: "Au moins 1 caractère spécial (!@#$…)",
    });
    CnilPasswordChecker.addLang("en", {
      minLength: "At least 12 characters",
      hasUppercase: "At least 1 uppercase letter",
      hasLowercase: "At least 1 lowercase letter",
      hasDigit: "At least 1 digit",
      hasSpecial: "At least 1 special character (!@#$…)",
    });
    CnilPasswordChecker.addLang("es", {
      minLength: "Al menos 12 caracteres",
      hasUppercase: "Al menos 1 letra mayúscula",
      hasLowercase: "Al menos 1 letra minúscula",
      hasDigit: "Al menos 1 dígito",
      hasSpecial: "Al menos 1 carácter especial (!@#$…)",
    });
    CnilPasswordChecker.addLang("de", {
      minLength: "Mindestens 12 Zeichen",
      hasUppercase: "Mindestens 1 Großbuchstabe",
      hasLowercase: "Mindestens 1 Kleinbuchstabe",
      hasDigit: "Mindestens 1 Ziffer",
      hasSpecial: "Mindestens 1 Sonderzeichen (!@#$…)",
    });
    CnilPasswordChecker.addLang("it", {
      minLength: "Almeno 12 caratteri",
      hasUppercase: "Almeno 1 lettera maiuscola",
      hasLowercase: "Almeno 1 lettera minuscola",
      hasDigit: "Almeno 1 cifra",
      hasSpecial: "Almeno 1 carattere speciale (!@#$…)",
    });
  }

  /**
   * Langue courante utilisée pour les libellés de règles.
   */
  static get lang(): LangCode {
    return CnilPasswordChecker._lang;
  }

  static set lang(value: LangCode) {
    CnilPasswordChecker._lang = value;
  }

  /**
   * Définitions des règles dans la langue courante (sans le champ `ok`, calculé à la volée).
   * Si la langue courante n'est pas enregistrée, fallback vers `fr`.
   */
  static get RULE_DEFS(): Omit<PasswordRule, "ok">[] {
    return (
      CnilPasswordChecker.TRANSLATIONS[CnilPasswordChecker._lang] ||
      CnilPasswordChecker.TRANSLATIONS.fr ||
      []
    );
  }

  /**
   * Définit le mot de passe à évaluer.
   * @param value - La valeur brute du mot de passe (non haché).
   */
  set pwd(value: string) {
    this._pwd = value;
  }

  /**
   * Retourne toutes les règles avec leur statut courant.
   * Recalculé à chaque appel depuis `_pwd`.
   */
  get rules(): PasswordRule[] {
    return CnilPasswordChecker.RULE_DEFS.map(({ key, label }) => ({
      key,
      label,
      ok: this.checkRule(key as RuleKey),
    }));
  }

  /**
   * Retourne les libellés des règles non respectées.
   * Tableau vide si le mot de passe est valide.
   */
  get errors(): string[] {
    return this.rules.filter((r) => !r.ok).map((r) => r.label);
  }

  /** Retourne les libellés des règles respectées. */
  get successes(): string[] {
    return this.rules.filter((r) => r.ok).map((r) => r.label);
  }

  /** `true` si toutes les règles CNIL sont respectées. */
  get isValid(): boolean {
    return this.rules.every((r) => r.ok);
  }

  /**
   * Évalue une règle individuelle sur `_pwd`.
   * @param key - Identifiant de la règle.
   * @returns `true` si la règle est respectée.
   */
  private checkRule(key: RuleKey): boolean {
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

  /**
   * Enregistre une nouvelle langue avec son jeu de traductions.
   * La langue devient immédiatement disponible via {@link lang}.
   *
   * @param code - Code de la nouvelle langue (ex. `"ru"`, `"pt"`, `"nl"`).
   * @param translations - Map clé de règle → libellé traduit.
   */
  static addLang(code: LangCode, translations: LangTranslations): void {
    CnilPasswordChecker.TRANSLATIONS[code] = RULE_KEYS.map((key) => ({
      key,
      label: translations[key] ?? key,
    }));
  }
}

