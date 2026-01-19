// See https://docs.convex.dev/testing/convex-test

import { expect, test } from "bun:test";

import { api, internal } from "./_generated/api";
import { createConvexTest } from "./test.setup";

test("sending messages", async () => {
  const t = createConvexTest();

  await t.mutation(api.examples.insertExample);

  const examples = await t.query(api.examples.fetchExamples);
  expect(examples).toStrictEqual([expect.objectContaining({ count: 0 })]);

  await t.mutation(internal.examples.setExampleCount, {
    exampleId: examples[0]!._id,
    count: 1,
  });

  expect(await t.query(api.examples.fetchExamples)).toStrictEqual([
    expect.objectContaining({ count: 1 }),
  ]);
});
