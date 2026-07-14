import { createFileRoute } from "@tanstack/react-router";
import {
  Nav,
  Hero,
  TrustBar,
  Showcase,
  Categories,
  Products,
  PromoBanner,
  Reviews,
  Partners,
  InstagramSection,
  FAQ,
  Footer,
  WhatsAppFab,
  LaunchStrip,
} from "@/components/nexphone";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "NexPhoneStore — iPhone, Apple Watch, AirPods e acessórios premium" },
      {
        name: "description",
        content:
          "Loja premium especializada em iPhones, Apple Watch, AirPods, iPads, Macs e acessórios Apple com garantia oficial e entrega para todo o Brasil.",
      },
      { property: "og:title", content: "NexPhoneStore — Tecnologia Apple Premium" },
      {
        property: "og:description",
        content: "Os produtos Apple mais desejados, com garantia, atendimento especializado e envio em 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#090909" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LaunchStrip />
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Showcase />
        <Categories />
        <Products />
        <PromoBanner />
        <Reviews />
        <Partners />
        <InstagramSection />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
