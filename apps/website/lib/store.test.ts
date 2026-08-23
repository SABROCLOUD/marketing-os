import { describe, expect, it } from "vitest";

import { calculateSubtotal, recommendRoutine } from "./store";

describe("calculateSubtotal", () => {
  it("sums product prices and quantities", () => {
    expect(
      calculateSubtotal([
        { price: 58, quantity: 2 },
        { price: 42, quantity: 1 },
      ]),
    ).toBe(158);
  });

  it("returns zero for an empty bag", () => {
    expect(calculateSubtotal([])).toBe(0);
  });
});

describe("recommendRoutine", () => {
  it("returns the hydration ritual for dry skin", () => {
    expect(recommendRoutine("dry").map((step) => step.productId)).toEqual([
      "dew-cleanse",
      "plump-serum",
      "barrier-cloud",
    ]);
  });

  it("returns a distinct calm ritual for sensitive skin", () => {
    expect(recommendRoutine("sensitive").map((step) => step.productId)).toEqual([
      "dew-cleanse",
      "plump-serum",
      "calm-veil",
    ]);
  });
});
