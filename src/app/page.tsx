import { HomeHero, CTASection } from "@/components/Hero";
import {
  AboutPreview,
  QuickLinks,
  SponsorBanner,
} from "@/components/HomeSections";
import { NewsSection, EventsSection } from "@/components/Sections";
import { StatBar } from "@/components/ui";
import { splitActivities } from "@/lib/activity-dates";
import { getContent, toRuntimeConfig } from "@/lib/content";

export default async function HomePage() {
  const content = await getContent();
  const runtime = toRuntimeConfig(content);
  const { upcoming } = splitActivities(content.activities);

  return (
    <>
      <HomeHero runtime={runtime} />
      <StatBar stats={content.stats} />
      <AboutPreview runtime={runtime} />
      <EventsSection runtime={runtime} activities={upcoming} />
      <QuickLinks runtime={runtime} quickLinks={content.quickLinks} />
      <NewsSection runtime={runtime} news={content.news} />
      <SponsorBanner runtime={runtime} sponsors={content.sponsors} />
      <CTASection runtime={runtime} />
    </>
  );
}
