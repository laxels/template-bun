// See https://docs.convex.dev/database/schemas

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  examples: defineTable({
    count: v.number(),
  }),
});
