import sha256 from "crypto-js/sha256";

const encodePreferencesKey = () => sha256(`preferences`).toString();

export const setAuthStatusInLocalStorage = (authStatus) => {
  localStorage.setItem(
    "growloc.isAuthed",
    authStatus ? "authenticated" : "unauthenticated"
  );
};

export const getIsAuthenticated = () => {
  const authStatus = localStorage.getItem("growloc.isAuthed");
  return authStatus === "authenticated";
};

export const getPreferenceValueFromStorage = (key) => {
  const preferences = localStorage.getItem(encodePreferencesKey());
  if (preferences === null || preferences.toString() === "undefined")
    return null;
  return JSON.parse(preferences).current?.[key];
};

export const setPreferenceValueInStorage = (key, value) => {
  const preferences = JSON.parse(
    localStorage.getItem(encodePreferencesKey()) || "{}"
  );
  const current = preferences.current || {};
  current[key] = value;
  preferences.current = current;
  localStorage.setItem(encodePreferencesKey(), JSON.stringify(preferences));
};

export const getForgotPasswordTimeInterval = (phoneNumber) => {
  return JSON.parse(localStorage.getItem(phoneNumber) || "{}");
};

export const setForgotPasswordTimeInterval = (phoneNumber) => {
  const forgotPassword = JSON.parse(localStorage.getItem(phoneNumber) || "{}");
  if (!forgotPassword || Object.keys(forgotPassword).length === 0) {
    localStorage.setItem(phoneNumber, JSON.stringify({ count: "60" }));
  } else {
    const currentCount = parseInt(forgotPassword.count, 10) || 0;
    localStorage.setItem(
      phoneNumber,
      JSON.stringify({ count: `${currentCount + 30}` })
    );
  }
};

export const setAuthTokens = (tokens) => {
  localStorage.setItem("authTokens", JSON.stringify(tokens));
};

export const getAuthTokens = () => {
  const tokens = JSON.parse(localStorage.getItem("authTokens") || "{}");
  return tokens;
};
