export const ADMIN_EMAIL = "admin@bowpow.com";

export const isAdminEmail = (email?: string | null) =>
  email?.trim().toLowerCase() === ADMIN_EMAIL;
