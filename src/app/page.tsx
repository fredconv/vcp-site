import { HomeHero, CTASection } from "@/components/Hero";
import {
  AboutPreview,
  QuickLinks,
  SponsorBanner,
} from "@/components/HomeSections";
import { NewsSection, EventsSection } from "@/components/Sections";
import { StatBar } from "@/components/ui";
import { getContent, toRuntimeConfig } from "@/lib/content";

export default async function HomePage() {
  const content = await getContent();
  const runtime = toRuntimeConfig(content);

  return (
    <>
      <HomeHero runtime={runtime} />
      <StatBar stats={content.stats} />
      <AboutPreview runtime={runtime} />
      <EventsSection events={content.events} />
      <QuickLinks />
      <NewsSection news={content.news} />
      <SponsorBanner sponsors={content.sponsors} />
      <CTASection runtime={runtime} />
    </>
  );
}
