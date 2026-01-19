// See:
// https://docs.convex.dev/functions/query-functions
// https://stack.convex.dev/typescript-zod-function-validation#using-zod-with-convex

import { NoOp } from "convex-helpers/server/customFunctions";
import { zCustomMutation, zCustomQuery, zid } from "convex-helpers/server/zod4";
import z from "zod";

import { internalMutation, mutation, query } from "./_generated/server";

const zQuery = zCustomQuery(query, NoOp);
const zMutation = zCustomMutation(mutation, NoOp);
const zInternalMutation = zCustomMutation(internalMutation, NoOp);

export const insertExample = zMutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.insert("examples", { count: 0 });
  },
});

export const fetchExamples = zQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("examples").collect();
  },
});

export const setExampleCount = zInternalMutation({
  args: {
    exampleId: zid("examples"),
    count: z.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.exampleId, { count: args.count });
  },
});
