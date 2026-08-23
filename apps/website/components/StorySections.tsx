"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

import { ingredients, journal, testimonials } from "@/content/site";
import { CondensationScene } from "@/components/ThreeScenes";

export function PrinciplesStrip() {
  return <section className="principles" aria-label="VELORA formulation principles"><p>Formulated for the barrier</p><span aria-hidden="true">✦</span><p>Made for daily return</p><span aria-hidden="true">✦</span><p>Texture before excess</p></section>;
}

function ScienceSection() {
  const [activeIngredient, setActiveIngredient] = useState(0);
  return (
    <section id="science" className="science-section section-pad"><div className="science-visual"><CondensationScene /><div className="science-orbit science-orbit--one" /><div className="science-orbit science-orbit--two" /><p>Water / lipid / botanical</p><strong>03</strong></div><div className="science-copy"><p className="eyebrow">Formulation, with feeling</p><h2>Skin knows when a formula belongs.</h2><p className="science-lede">We build around skin-compatible moisture, familiar lipids, and antioxidant support—then refine every texture until the ritual feels instinctive.</p><div className="ingredient-list">{ingredients.map((ingredient, index) => <button type="button" key={ingredient.number} className={activeIngredient === index ? "is-active" : ""} onClick={() => setActiveIngredient(index)} aria-expanded={activeIngredient === index}><span>{ingredient.number}</span><div><h3>{ingredient.name}</h3><small>{ingredient.origin}</small>{activeIngredient === index ? <p>{ingredient.description}</p> : null}</div><span aria-hidden="true">{activeIngredient === index ? "—" : "+"}</span></button>)}</div></div></section>
  );
}

function RoutineTimeline() {
  return <section className="timeline-section section-pad"><div className="section-heading section-heading--split"><div><p className="eyebrow">A ritual that remembers you</p><h2>Morning clarity.<br />Evening return.</h2></div><p>Good skincare does not demand more steps. It makes each one feel inevitable.</p></div><div className="timeline"><article><span>07:10</span><div><p className="eyebrow">Morning</p><h3>Wake the skin gently.</h3><p>Cleanse lightly. Press hydration into damp skin. Seal with moisture, then finish with your preferred SPF.</p></div></article><article><span>21:40</span><div><p className="eyebrow">Evening</p><h3>Let the day dissolve.</h3><p>Take time with the cleanse. Layer serum while skin is receptive. Finish with a comforting veil.</p></div></article></div></section>;
}

function EditorialStory() {
  return <section className="editorial-story"><div className="editorial-story__image"><Image src="/images/velora/editorial-skin.png" alt="Portrait with naturally luminous, textured skin" fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover" /></div><div className="editorial-story__copy"><p className="eyebrow">The VELORA point of view</p><blockquote>“The goal is not perfect skin. It is skin that feels like yours.”</blockquote><p>We formulate for consistency over spectacle: elegant layers, compatible ingredients, and a finish that lets real skin stay visible.</p><a className="text-link" href="#journal">Read our philosophy ↗</a></div></section>;
}

function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = testimonials[index];
  return <section className="testimonial-section section-pad"><p className="eyebrow">Field notes · 03</p><blockquote>“{item.quote}”</blockquote><div className="testimonial-meta"><div><strong>{item.name}</strong><span>{item.detail}</span></div><div className="testimonial-controls"><button type="button" aria-label="Previous testimonial" onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}>←</button><span>0{index + 1} / 0{testimonials.length}</span><button type="button" aria-label="Next testimonial" onClick={() => setIndex((index + 1) % testimonials.length)}>→</button></div></div></section>;
}

function Journal() {
  return <section id="journal" className="journal-section section-pad"><div className="section-heading section-heading--split"><div><p className="eyebrow">The journal</p><h2>Notes on skin,<br />ritual, and restraint.</h2></div><a className="text-link" href="#journal">Read all notes ↗</a></div><div className="journal-grid">{journal.map((entry, index) => <article key={entry.title}><a href="#journal" aria-label={`Read ${entry.title}`}><div className={`journal-image journal-image--${index + 1}`}><Image src={entry.image} alt={entry.imageAlt} fill sizes="(max-width: 768px) 92vw, 32vw" className="object-cover transition-transform duration-700" /></div><div className="journal-meta"><span>{entry.category}</span><span>{entry.readTime}</span></div><h3>{entry.title}</h3></a></article>)}</div></section>;
}

function Newsletter() {
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email")?.toString().trim() ?? "";
    if (!/^\S+@\S+\.\S+$/.test(email)) { setMessage("Enter a valid email to continue."); return; }
    setMessage("You’re on the list. Your first field note arrives soon."); form.reset();
  };
  return <section className="newsletter"><div><p className="eyebrow">A slower inbox</p><h2>One thoughtful note,<br />every other Sunday.</h2></div><form onSubmit={submit} noValidate><label htmlFor="newsletter-email">Email address</label><div><input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" aria-describedby="newsletter-message" /><button type="submit" aria-label="Join the VELORA newsletter">Join ↗</button></div><p id="newsletter-message" role="status">{message || "Ritual guidance, ingredient notes, and no daily noise."}</p></form></section>;
}

export function StorySections() {
  return <><ScienceSection /><RoutineTimeline /><EditorialStory /><Testimonials /><Journal /><Newsletter /></>;
}
