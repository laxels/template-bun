import { config } from "@dotenvx/dotenvx";

const NODE_ENV = process.env.NODE_ENV ?? `development`;

config({
  path: [`.env.${NODE_ENV}.local`, `.env.local`, `.env.${NODE_ENV}`, `.env`],
  ignore: ["MISSING_ENV_FILE"],
});

export function env(name: string): string | undefined {
  return process.env[name];
}
