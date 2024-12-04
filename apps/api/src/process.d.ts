declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL: string;
    readonly npm_package_version: string;
    readonly R2_ACCOUNT_ID: string;
    readonly R2_ACCESS_KEY_ID: string;
    readonly R2_SECRET_ACCESS_KEY: string;
    readonly R2_BUCKET_NAME: string;
  }
}
