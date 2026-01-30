# Agent Instructions

This is a living document. Update any outdated information in this document IMMEDIATELY.

---

## Context library

The `context-library/` directory contains files with additional context. Each file starts with YAML frontmatter describing when it is relevant. If a context file is relevant to your current task, you MUST read it.

Note that this applies not only at the start, but throughout the duration of your task. If a context file suddenly becomes relevant mid-task, read it immediately.

---

## Habits

### Post-task ritual

After you're done with your task, ALWAYS follow these steps unless instructed otherwise:

1. Run `bun run validate` and fix all errors until there are no more.
2. Stage only files you've changed, commit with a concise message, and push.

### Be extremely proactive about asking questions

Ask the user questions liberally. Non-exhaustive examples of when to ask:

- When you are confused about anything.
- When you encounter multiple valid paths forward.
- When you need something only the user can provide.

### Alert the user when a source is inaccessible or incomplete

If the user points you to a source (files, URLs, etc.) and you cannot access it or the contents seem incomplete, STOP and alert the user before continuing. Avoid continuing with incomplete information unless instructed otherwise.

---

## Coding style

- Use explicit return types to make function signatures more informative and protect against bugs.
  It's ok to leave it inferred if the return type is difficult to encode.
- `noUncheckedIndexedAccess` is enabled, so you MUST check that `arr[i]`/`obj[key]` is not `undefined`.
- Prefer named exports/imports unless necessary.
- Use `??` instead of `||` for nullish coalescing.
- Use `== null` instead of falsy checks when checking if a value is nullish.
- Prefer type aliases over interfaces unless necessary.
- Use `Number(str)` instead of `parseInt(str)` or `parseFloat(str)`.
- Prefer function declaration syntax (`function fn()`) over assignment (`const fn = ...`) unless using an arrow function is necessary, like when annotating the whole function with a type.
- Type React components using React's `FC` type. Note that this necessitates using an arrow function.
- NEVER create barrel files.
- Use `outdent` to format multi-line template strings.
- Use the `http-status-codes` library instead of hardcoding HTTP status codes.
- We use `ts-reset`, so `JSON.parse()` and `Response.json()` return `unknown` instead of `any`.
  Remember to account for all the other `ts-reset` changes you're familiar with.

### Guard clauses

HEAVILY prefer guard clauses (early returns) to reduce nesting and improve readability.

Prefer this:

```ts
if (stuff == null) {
  return defaultValue;
}
// ... Actual function logic ...
```

over this:

```ts
if (stuff != null) {
  // ... Actual function logic ...
}
return defaultValue;
```

### Assertions

Use [assertions](src/lib/assert.ts) to narrow down types as early as possible, avoiding verbose handling of disallowed types:

```ts
function Component() {
  const { roomId } = useParams<{ roomId: string }>();
  // `roomId` is `string | undefined`

  truthy(roomId);
  // `roomId` is now `string`
}
```

Proactively add new assertion functions as needed.

---

## Important commands

Prefer these commands over ad-hoc bash commands when possible:

- `bun run dev` - Start development server with hot reload
- `bun run dev:convex` - Start Convex development server
- `bun run start` - Start production server
- `bun run build` - Build the project
- `bun run validate` - Run typecheck, lint, and test concurrently
- `bun run typecheck` - Run TypeScript type checking
- `bun run lint` - Run Biome linter with auto-fix
- `bun run test` - Run tests

---

## Use Bun

Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Use `bunx <package> <command>` instead of `npx <package> <command>`

### APIs

- `Bun.serve()` supports WebSockets, HTTPS, and routes. Don't use `express`.
- `bun:sqlite` for SQLite. Don't use `better-sqlite3`.
- `Bun.redis` for Redis. Don't use `ioredis`.
- `Bun.sql` for Postgres. Don't use `pg` or `postgres.js`.
- `WebSocket` is built-in. Don't use `ws`.
- Prefer `Bun.file` over `node:fs`'s readFile/writeFile
- Bun.$`ls` instead of execa.

### Testing

Use `bun test` to run tests.

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

### Frontend

Use HTML imports with `Bun.serve()`. Don't use `vite`. HTML imports fully support React, CSS, Tailwind.

Server:

```ts#index.ts
import index from "./index.html"

Bun.serve({
  routes: {
    "/": index,
    "/api/users/:id": {
      GET: (req) => {
        return new Response(JSON.stringify({ id: req.params.id }));
      },
    },
  },
  // optional websocket support
  websocket: {
    open: (ws) => {
      ws.send("Hello, world!");
    },
    message: (ws, message) => {
      ws.send(message);
    },
    close: (ws) => {
      // handle close
    }
  },
  development: {
    hmr: true,
    console: true,
  }
})
```

HTML files can import .tsx, .jsx or .js files directly and Bun's bundler will transpile & bundle automatically. `<link>` tags can point to stylesheets and Bun's CSS bundler will bundle.

```html#index.html
<html>
  <body>
    <h1>Hello, world!</h1>
    <script type="module" src="./frontend.tsx"></script>
  </body>
</html>
```

With the following `frontend.tsx`:

```tsx#frontend.tsx
import React from "react";
import { createRoot } from "react-dom/client";

// import .css files directly and it works
import './index.css';

const root = createRoot(document.body);

export default function Frontend() {
  return <h1>Hello, world!</h1>;
}

root.render(<Frontend />);
```

Then, run index.ts

```sh
bun --hot ./index.ts
```

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.mdx`.
