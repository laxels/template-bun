// See:
// https://docs.convex.dev/database/schemas
// https://stack.convex.dev/typescript-zod-function-validation#using-zod-with-convex

import { defineSchema, defineTable } from "convex/server";
import { zodOutputToConvex } from "convex-helpers/server/zod";
import z from "zod";

const exampleSchema = z.object({
  count: z.number(),
});
export type Example = z.infer<typeof exampleSchema>;

export default defineSchema({
  examples: defineTable(zodOutputToConvex(exampleSchema)),
});
