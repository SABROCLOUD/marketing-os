import { CommerceExperience } from "@/components/CommerceExperience";
import { Hero } from "@/components/Hero";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StorefrontProvider } from "@/components/StorefrontProvider";
import { PrinciplesStrip, StorySections } from "@/components/StorySections";

export default function Home() {
  return <StorefrontProvider><SiteHeader /><main><Hero /><PrinciplesStrip /><CommerceExperience /><StorySections /></main><SiteFooter /></StorefrontProvider>;
}
