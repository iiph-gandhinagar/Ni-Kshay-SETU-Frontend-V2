declare module '@env' {
  export const NX_PUBLIC_STORE_URL: string;
  export const NX_PUBLIC_BASE_URL: string;
  export const NX_PUBLIC_WEB_APP_URL: string;
  // Add other environment variables here
}
export interface ProcessEnv {
  NX_PUBLIC_STORE_URL: string;
  NX_PUBLIC_BASE_URL: string;
  NX_PUBLIC_WEB_APP_URL: string;
}

// Extend the NodeJS.ProcessEnv interface
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NX_PUBLIC_STORE_URL: string;
      NX_PUBLIC_BASE_URL: string;
      NX_PUBLIC_WEB_APP_URL: string;
    }
  }
}
