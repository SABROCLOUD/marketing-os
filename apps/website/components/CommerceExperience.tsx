"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { concerns, products, type Product } from "@/content/site";
import { recommendRoutine, type Concern } from "@/lib/store";
import { useStorefront } from "@/components/StorefrontProvider";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { openProduct, addToBag } = useStorefront();
  return (
    <article className={`product-card product-card--${product.tone}`}>
      <button className="product-card__visual" type="button" onClick={() => openProduct(product)} aria-label={`View ${product.name}`}>
        <span className="product-card__index">0{index + 1}</span>
        <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 768px) 88vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        <span className="product-card__view">Quick view ↗</span>
      </button>
      <div className="product-card__meta">
        <div><p className="product-card__eyebrow">{product.eyebrow}</p><h3>{product.name}</h3></div>
        <div className="text-right"><p>${product.price}</p><button type="button" onClick={() => addToBag(product.id)}>Add +</button></div>
      </div>
    </article>
  );
}

function ProductDialog() {
  const { selectedProduct, closeProduct, addToBag } = useStorefront();
  if (!selectedProduct) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) closeProduct(); }}>
      <section className="product-dialog" role="dialog" aria-modal="true" aria-labelledby="product-dialog-title">
        <button className="modal-close" type="button" onClick={closeProduct} aria-label="Close product details" autoFocus>×</button>
        <div className={`product-dialog__image product-card--${selectedProduct.tone}`}><Image src={selectedProduct.image} alt={selectedProduct.imageAlt} fill sizes="(max-width: 768px) 100vw, 48vw" className="object-cover" /></div>
        <div className="product-dialog__copy">
          <p className="eyebrow">{selectedProduct.eyebrow}</p>
          <h2 id="product-dialog-title">{selectedProduct.name}</h2>
          <p className="product-dialog__benefit">{selectedProduct.benefit}</p>
          <p>{selectedProduct.description}</p>
          <div className="usage-note"><span>How to use</span><p>{selectedProduct.usage}</p></div>
          <div className="product-dialog__buy"><span>{selectedProduct.size}</span><button className="button button--dark" type="button" onClick={() => addToBag(selectedProduct.id)}>Add to bag · ${selectedProduct.price}</button></div>
        </div>
      </section>
    </div>
  );
}

function BagDrawer() {
  const { bag, isBagOpen, closeBag, removeFromBag, subtotal } = useStorefront();
  if (!isBagOpen) return null;
  return (
    <div className="modal-backdrop modal-backdrop--drawer" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) closeBag(); }}>
      <aside className="bag-drawer" role="dialog" aria-modal="true" aria-labelledby="bag-title">
        <div className="bag-drawer__head"><div><p className="eyebrow">Your ritual</p><h2 id="bag-title">The bag</h2></div><button className="modal-close !static" type="button" onClick={closeBag} aria-label="Close bag" autoFocus>×</button></div>
        <div className="bag-drawer__body">
          {bag.length === 0 ? <div className="empty-bag"><span>○</span><p>Your ritual is waiting.</p><a href="#shop" onClick={closeBag}>Explore the collection</a></div> : bag.map((line) => {
            const product = products.find((item) => item.id === line.productId);
            if (!product) return null;
            return <div className="bag-line" key={line.productId}><div className={`bag-line__image product-card--${product.tone}`}><Image src={product.image} alt="" fill sizes="96px" className="object-cover" /></div><div className="bag-line__copy"><p>{product.name}</p><span>{product.size}</span><small>Quantity {line.quantity}</small><button type="button" onClick={() => removeFromBag(line.productId)}>Remove</button></div><strong>${product.price * line.quantity}</strong></div>;
          })}
        </div>
        <div className="bag-drawer__foot"><div><span>Subtotal</span><strong>${subtotal}</strong></div><p>Shipping and taxes are calculated at checkout.</p><button className="button button--dark w-full" type="button" disabled={bag.length === 0}>Demo checkout</button><small>No payment processor is connected in this demonstration.</small></div>
      </aside>
    </div>
  );
}

function RitualFinder() {
  const [concern, setConcern] = useState<Concern>("dry");
  const selected = concerns.find((item) => item.id === concern) ?? concerns[0];
  const routineProducts = useMemo(() => recommendRoutine(concern).map((step) => ({ step, product: products.find((item) => item.id === step.productId) })).filter((item): item is { step: { order: number; productId: string }; product: Product } => Boolean(item.product)), [concern]);
  return (
    <section id="ritual" className="ritual-finder section-pad">
      <div className="section-heading section-heading--split"><div><p className="eyebrow">Build your ritual</p><h2>What is your skin asking for?</h2></div><p>Not a diagnosis. Just a thoughtful place to begin, designed around how your skin feels today.</p></div>
      <div className="concern-tabs" role="tablist" aria-label="Skin concern">{concerns.map((item) => <button key={item.id} type="button" role="tab" aria-selected={concern === item.id} onClick={() => setConcern(item.id)}><span>{item.label}</span><small>{item.prompt}</small></button>)}</div>
      <div className="ritual-result"><div className="ritual-result__intro"><p className="eyebrow">Your three-step edit</p><h3>{selected.result}</h3><a className="text-link" href="#shop">Shop this ritual ↗</a></div><div className="ritual-steps">{routineProducts.map(({ step, product }) => <article key={product.id}><span>0{step.order}</span><div className="ritual-step__image"><Image src={product.image} alt="" fill sizes="180px" className="object-cover" /></div><div><p>{product.eyebrow}</p><h4>{product.name}</h4></div></article>)}</div></div>
    </section>
  );
}

export function CommerceExperience() {
  return (
    <>
      <section id="shop" className="shop-section section-pad"><div className="section-heading section-heading--split"><div><p className="eyebrow">The daily edit</p><h2>Four formulas.<br />Endless good-skin days.</h2></div><div><p>Each texture is designed to layer cleanly, disappear beautifully, and earn its place on your shelf.</p><span className="section-count">01 — 04</span></div></div><div className="product-grid">{products.slice(0, 4).map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}</div></section>
      <RitualFinder />
      <ProductDialog />
      <BagDrawer />
    </>
  );
}
