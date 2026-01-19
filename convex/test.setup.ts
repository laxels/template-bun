// This file's name must have multiple dots so that the Convex compiler excludes it.
// See https://discord-questions.convex.dev/m/1257421270010564659

import { relative } from "node:path";
import { pathToFileURL } from "node:url";
import { Glob } from "bun";
import { convexTest } from "convex-test";

import schema from "./schema";

// This is a workaround to handle the fact that Bun doesn't have `import.meta.glob`
// which is used in the `convex-test` package.
// See https://github.com/oven-sh/bun/issues/6060#issuecomment-2919603324
// The solution in the GitHub issue above is for using Bun with Vitest,
// as it assumes that `import.meta.glob` is available from `vite/client`.
// This version is modified to use Bun's `Glob` instead.
const glob = new Glob("./**/!(*.*.*)*.*s");
const modules: Record<string, () => Promise<unknown>> = {};
for await (const absPath of glob.scan({
  cwd: import.meta.dir,
  absolute: true,
})) {
  const key = `./${relative(import.meta.dir, absPath).replaceAll("\\", "/")}`;
  modules[key] = () => import(pathToFileURL(absPath).href);
}

export function createConvexTest(): ReturnType<typeof convexTest> {
  return convexTest(schema, modules);
}
