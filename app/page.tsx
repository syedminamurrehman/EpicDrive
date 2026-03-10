import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { carService } from "@/services/carService";
import { Car } from "@/types";
import Link from "next/link";
import { Metadata } from "next";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Home",
  description: "Epic Drive is Karachi's leading premium car rental service. Browse our fleet of verified luxury sedans and SUVs. Reliable service for DHA, Bahria Town, and all of Karachi.",
  keywords: ["premium car rental karachi", "luxury fleet karachi", "verified car rental karachi", "epic drive home"],
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  let featuredCars: Car[] = [];
  try {
    // Fetch featured cars (most expensive first, take 4)
    const cars = await carService.getCars({ sort: 'price_desc' });
    featuredCars = cars.slice(0, 4);
  } catch (error: any) {
    console.error('CRITICAL PAGE LOAD ERROR:', {
      message: error.message,
      code: error.code,
      details: error.details,
      stack: error.stack
    });
  }

  return (
    <main className="min-h-screen bg-transparent relative">
      <Navbar />
      <Hero />

      {/* Featured Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-accent border border-border text-primary rounded-full text-[10px] font-black uppercase tracking-widest leading-none shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span>The Elite Selection</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter leading-none">
                FEATURED <span className="text-primary italic animate-pulse-slow">FLEET</span>
              </h2>
              <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                Hand-picked premium vehicles for the most demanding drives in Karachi. Experience luxury and reliability.
              </p>
            </div>
            <Link
              href="/cars"
              className="px-10 py-5 bg-accent text-foreground rounded-[2.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-border transition-all border border-border mb-2 active:scale-95"
            >
              View Full Garage
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="mt-24 text-center">
            <Link
              href="/cars"
              className="inline-flex items-center space-x-4 text-xl font-black text-foreground hover:text-primary transition-all group"
            >
              <span className="tracking-tighter uppercase">Explore full catalog</span>
              <div className="w-14 h-14 rounded-[1.5rem] bg-accent border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-lg group-hover:shadow-primary/30 group-hover:scale-110">
                <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* Section Ambient Glow */}
        <div className="absolute top-1/2 left-0 w-full h-[60%] bg-primary/5 blur-[150px] -z-10 -translate-y-1/2" />
      </section>

      <HowItWorks />
      <FAQ />

      <Footer />
    </main>
  );
}
