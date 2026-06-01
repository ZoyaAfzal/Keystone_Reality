import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { NeighborhoodsSection } from "@/components/home/NeighborhoodsSection";
import { AgentsSection } from "@/components/home/AgentsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Keystone Realty — Find Your Perfect Haven" },
      {
        name: "description",
        content:
          "Discover extraordinary properties curated for those who appreciate the finest in architecture and design.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedProperties />
        <NeighborhoodsSection />
        <AgentsSection />
        <TestimonialsSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}
