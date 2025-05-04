export const exceptions = {
  FieldValidationException: "FieldLevelException",
  NotFoundException: "NotFoundException",
  BadRequestException: "BadRequestException",
};

export const passwordPolicy = {
  minimumLength: 8,
  lowerCase: true,
  upperCase: true,
  numbers: true,
  symbols: true,
};

export const TOKEN_EXPIRE_TIME = 3200;

export const LOCAL_STORAGE_KEYS = {
  farm: "farm",
  organization: "organization",
  language: "language",
  isRelianceAccount: "isRelianceAccount",
};

export const LANGUAGE_KEYS = {
  en: "en",
  marathi: "marathi",
  hindi: "hindi",
};

export const ONBOARDING_API_ACTIONS = {
  onboardFarm: "onboard-farm",
  onboardSensor: "onboard-sensor",
};

export const LANGUAGE_OPTIONS = [
  {
    label: "English",
    key: LANGUAGE_KEYS.en,
  },
  {
    label: "Marathi",
    key: LANGUAGE_KEYS.marathi,
  },
  {
    label: "Hindi",
    key: LANGUAGE_KEYS.hindi,
  },
];

export const CURRENCY = "INR";
export const CURRENCY_SYMBOL = "₹";
export const SYSTEM_GENERATED_DEVICE = "System generated device";
export const DEFAULT_DEVICE_VERSION = "1.0.0";
export const DEFAULT_PROVIDER = "growloc";
export const LIFECYCLE_STATUS = {
  DRAFT: "DRAFT",
  COMPLETED: "COMPLETED",
  RUNNING: "RUNNING",
};
export const REDIRECT_TO_URL = "redirectTo";
