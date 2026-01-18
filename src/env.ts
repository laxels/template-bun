import { config } from "@dotenvx/dotenvx";

config();

export function env(name: string): string | undefined {
  return process.env[name];
}
