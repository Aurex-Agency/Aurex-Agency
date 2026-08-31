import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { SignalRail } from "@/components/signal/SignalRail";

import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Activation } from "@/components/sections/Activation";
import { Attention } from "@/components/sections/Attention";
import { Capture } from "@/components/sections/Capture";
import { Speed } from "@/components/sections/Speed";
import { Pipeline } from "@/components/sections/Pipeline";
import { Revenue } from "@/components/sections/Revenue";
import { System } from "@/components/sections/System";
import { Proof } from "@/components/sections/Proof";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { OldWay } from "@/components/sections/OldWay";
import { About } from "@/components/sections/About";
import { You } from "@/components/sections/You";
import { Build } from "@/components/sections/Build";

/**
 * The homepage is one continuous machine being assembled.
 *
 * Each chapter creates the next rather than sitting beside it: the hero
 * node becomes the Signal, the Signal sorts the chaos, the sorted system
 * finds an audience, the audience becomes a lead, the lead becomes a
 * pipeline, the pipeline becomes revenue, the revenue explains the
 * services, the services break back apart into the old way, and the old
 * way reassembles as Aurex.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <SignalRail />
      <main id="main">
        <Hero />
        <Problem />
        <Activation />
        <Attention />
        <Capture />
        <Speed />
        <Pipeline />
        <Revenue />
        <System />
        <Proof />
        <CaseStudies />
        <OldWay />
        <About />
        <You />
        <Build />
      </main>
      <Footer />
    </>
  );
}
