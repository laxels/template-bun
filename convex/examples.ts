// See https://docs.convex.dev/functions/query-functions

import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

export const insertExample = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.insert("examples", { count: 0 });
  },
});

export const fetchExamples = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("examples").collect();
  },
});

export const setExampleCount = internalMutation({
  args: {
    exampleId: v.id("examples"),
    count: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.exampleId, { count: args.count });
  },
});
