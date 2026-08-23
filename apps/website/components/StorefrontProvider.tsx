"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { products, type Product } from "@/content/site";
import { calculateSubtotal } from "@/lib/store";

type BagLine = { productId: string; quantity: number };
type StorefrontContextValue = {
  bag: BagLine[]; bagCount: number; subtotal: number; selectedProduct: Product | null; isBagOpen: boolean;
  addToBag: (productId: string) => void; removeFromBag: (productId: string) => void;
  openProduct: (product: Product) => void; closeProduct: () => void; openBag: () => void; closeBag: () => void;
};

const StorefrontContext = createContext<StorefrontContextValue | null>(null);

export function StorefrontProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagLine[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBagOpen, setBagOpen] = useState(false);
  const previousFocus = useRef<HTMLElement | null>(null);
  const modalOpen = Boolean(selectedProduct) || isBagOpen;

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setSelectedProduct(null); setBagOpen(false); }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [modalOpen]);

  const restoreFocus = () => requestAnimationFrame(() => previousFocus.current?.focus());
  const value = useMemo<StorefrontContextValue>(() => {
    const lines = bag.flatMap((line) => {
      const product = products.find((item) => item.id === line.productId);
      return product ? [{ price: product.price, quantity: line.quantity }] : [];
    });
    return {
      bag,
      bagCount: bag.reduce((total, line) => total + line.quantity, 0),
      subtotal: calculateSubtotal(lines), selectedProduct, isBagOpen,
      addToBag(productId) {
        setBag((current) => {
          const existing = current.find((line) => line.productId === productId);
          return existing ? current.map((line) => line.productId === productId ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { productId, quantity: 1 }];
        });
        setSelectedProduct(null); setBagOpen(true);
      },
      removeFromBag(productId) { setBag((current) => current.filter((line) => line.productId !== productId)); },
      openProduct(product) { previousFocus.current = document.activeElement as HTMLElement; setBagOpen(false); setSelectedProduct(product); },
      closeProduct() { setSelectedProduct(null); restoreFocus(); },
      openBag() { previousFocus.current = document.activeElement as HTMLElement; setSelectedProduct(null); setBagOpen(true); },
      closeBag() { setBagOpen(false); restoreFocus(); },
    };
  }, [bag, isBagOpen, selectedProduct]);

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>;
}

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (!context) throw new Error("useStorefront must be used inside StorefrontProvider");
  return context;
}
