export type Concern = "dry" | "dull" | "sensitive";

export type CartLine = {
  price: number;
  quantity: number;
};

export type RoutineStep = {
  order: number;
  productId: string;
};

const routines: Record<Concern, RoutineStep[]> = {
  dry: [
    { order: 1, productId: "dew-cleanse" },
    { order: 2, productId: "plump-serum" },
    { order: 3, productId: "barrier-cloud" },
  ],
  dull: [
    { order: 1, productId: "dew-cleanse" },
    { order: 2, productId: "radiance-c" },
    { order: 3, productId: "barrier-cloud" },
  ],
  sensitive: [
    { order: 1, productId: "dew-cleanse" },
    { order: 2, productId: "plump-serum" },
    { order: 3, productId: "calm-veil" },
  ],
};

export function calculateSubtotal(lines: CartLine[]) {
  return lines.reduce(
    (total, line) => total + line.price * line.quantity,
    0,
  );
}

export function recommendRoutine(concern: Concern) {
  return routines[concern];
}
