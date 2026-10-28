export interface AppConfig {
  PORT: number;
  DB_HOST: string;
  SALT: string;
}

export interface ConfigInterface {
  get<Key extends keyof AppConfig>(key: Key): AppConfig[Key];
}
