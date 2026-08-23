import type { Concern } from "@/lib/store";

export type NavItem = { label: string; href: string };

export type Product = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  benefit: string;
  usage: string;
  size: string;
  price: number;
  image: string;
  imageAlt: string;
  tone: "sage" | "pearl" | "clay" | "ink";
};

export type ConcernOption = {
  id: Concern;
  label: string;
  prompt: string;
  result: string;
};

export type Ingredient = {
  number: string;
  name: string;
  origin: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

export type JournalEntry = {
  category: string;
  title: string;
  readTime: string;
  image: string;
  imageAlt: string;
};

export const navigation: NavItem[] = [
  { label: "Shop", href: "#shop" },
  { label: "The ritual", href: "#ritual" },
  { label: "Our science", href: "#science" },
  { label: "Journal", href: "#journal" },
];

export const products: Product[] = [
  {
    id: "dew-cleanse",
    name: "Dew Cleanse",
    eyebrow: "Amino gel cleanser",
    description:
      "A cushiony, low-foam cleanse that lifts the day without leaving skin feeling stripped.",
    benefit: "Clean, calm, comfortably soft",
    usage: "Massage onto damp skin for 30 seconds, morning and evening. Rinse with lukewarm water.",
    size: "120 ml / 4 fl oz",
    price: 34,
    image: "/images/velora/dew-cleanse.png",
    imageAlt: "VELORA Dew Cleanse bottle on warm ivory stone",
    tone: "pearl",
  },
  {
    id: "plump-serum",
    name: "Plump Serum",
    eyebrow: "Multi-weight hydration",
    description:
      "A sheer serum with humectants and beta-glucan that leaves skin visibly supple and fresh.",
    benefit: "Immediate, weightless hydration",
    usage: "Press two drops into slightly damp skin before moisturizer.",
    size: "30 ml / 1 fl oz",
    price: 58,
    image: "/images/velora/plump-serum.png",
    imageAlt: "VELORA Plump Serum glass dropper bottle",
    tone: "sage",
  },
  {
    id: "radiance-c",
    name: "Radiance C",
    eyebrow: "Daily antioxidant serum",
    description:
      "A silky vitamin C blend that supports a brighter-looking, more even complexion.",
    benefit: "Soft-focus morning radiance",
    usage: "Smooth two drops over clean skin in the morning, followed by moisturizer and SPF.",
    size: "30 ml / 1 fl oz",
    price: 62,
    image: "/images/velora/radiance-c.png",
    imageAlt: "VELORA Radiance C amber serum bottle",
    tone: "clay",
  },
  {
    id: "barrier-cloud",
    name: "Barrier Cloud",
    eyebrow: "Ceramide moisture cream",
    description:
      "A cloud-soft cream that helps reinforce the moisture barrier with ceramides and squalane.",
    benefit: "Lasting comfort without heaviness",
    usage: "Warm a pearl-sized amount between fingertips and press over face and neck.",
    size: "50 ml / 1.7 fl oz",
    price: 54,
    image: "/images/velora/barrier-cloud.png",
    imageAlt: "VELORA Barrier Cloud cream jar with sculpted cream texture",
    tone: "ink",
  },
  {
    id: "calm-veil",
    name: "Calm Veil",
    eyebrow: "Comforting recovery balm",
    description:
      "A fragrance-free balm that wraps dry, sensitive-feeling skin in a breathable veil of comfort.",
    benefit: "Quiet support for delicate days",
    usage: "Press a thin layer over moisturizer whenever skin feels exposed or tight.",
    size: "45 ml / 1.5 fl oz",
    price: 48,
    image: "/images/velora/calm-veil.png",
    imageAlt: "VELORA Calm Veil tube on pale mineral stone",
    tone: "pearl",
  },
];

export const concerns: ConcernOption[] = [
  {
    id: "dry",
    label: "Dry + tight",
    prompt: "Skin asks for water and a stronger seal.",
    result: "Layer water-first hydration beneath a ceramide-rich finish.",
  },
  {
    id: "dull",
    label: "Dull + uneven",
    prompt: "Skin looks tired even after rest.",
    result: "Pair gentle cleansing with antioxidant brightness and barrier support.",
  },
  {
    id: "sensitive",
    label: "Easily unsettled",
    prompt: "Skin prefers fewer steps and quieter formulas.",
    result: "Keep the ritual fragrance-free, cushioning, and deliberately simple.",
  },
];

export const ingredients: Ingredient[] = [
  {
    number: "01",
    name: "Snow mushroom",
    origin: "Hydration network",
    description: "A moisture-binding polysaccharide that supports a soft, replenished skin feel.",
  },
  {
    number: "02",
    name: "Oat lipid",
    origin: "Barrier comfort",
    description: "A skin-compatible lipid selected to help reduce the feeling of dryness and tightness.",
  },
  {
    number: "03",
    name: "Green tea",
    origin: "Antioxidant support",
    description: "A familiar botanical antioxidant used to help defend the look of calm, rested skin.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "The textures disappear beautifully. My routine feels considered, never complicated.",
    name: "Maya R.",
    detail: "VELORA community · demonstration story",
  },
  {
    quote: "Barrier Cloud is the rare rich cream that still feels like air by morning.",
    name: "Nina L.",
    detail: "VELORA community · demonstration story",
  },
  {
    quote: "Three steps, no noise. My skin looks rested and the ritual is finally one I keep.",
    name: "Avery S.",
    detail: "VELORA community · demonstration story",
  },
];

export const journal: JournalEntry[] = [
  {
    category: "Ritual notes",
    title: "Why damp skin changes the way hydration feels",
    readTime: "4 min read",
    image: "/images/velora/ingredient-macro.png",
    imageAlt: "Macro view of translucent skincare gel and water",
  },
  {
    category: "Formulation",
    title: "A quieter approach to supporting your barrier",
    readTime: "6 min read",
    image: "/images/velora/editorial-skin.png",
    imageAlt: "Editorial portrait with luminous natural skin",
  },
  {
    category: "Field study",
    title: "The textures, minerals, and morning light behind VELORA",
    readTime: "3 min read",
    image: "/images/velora/hero-product.png",
    imageAlt: "VELORA skincare bottle in warm morning light",
  },
];

export const brand = {
  name: "VELORA",
  announcement: "Complimentary ritual pouch with orders over $90",
  heroEyebrow: "Skin, returned to balance",
  heroTitle: "Less noise. More skin.",
  heroBody:
    "Elemental formulas, intelligent textures, and a ritual simple enough to keep.",
};
