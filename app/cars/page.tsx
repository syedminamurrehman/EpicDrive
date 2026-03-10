import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import SearchFilters from "@/components/SearchFilters";
import { carService } from "@/services/carService";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Browse Cars",
    description: "Explore our extensive fleet of premium rental cars in Karachi. Filters by price, fuel category (Petrol, Diesel, Hybrid, Electric), and features. Find the best rent a car in Karachi effortlessly.",
    keywords: ["rent a car catalogue karachi", "luxury sedans karachi", "electric vehicles for rent karachi", "suv rental karachi", "karachi fleet"],
};

export const dynamic = 'force-dynamic';

export default async function CarsPage({
    searchParams: searchParamsPromise,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = await searchParamsPromise;

    const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
    const query = typeof searchParams.query === 'string' ? searchParams.query : undefined;
    const minPrice = typeof searchParams.minPrice === 'string' ? Number(searchParams.minPrice) : undefined;
    const maxPrice = typeof searchParams.maxPrice === 'string' ? Number(searchParams.maxPrice) : undefined;
    const adas = typeof searchParams.adas === 'string' ? searchParams.adas : undefined;
    const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'price_desc';

    // Fetch cars based on all filters
    let cars: any[] = [];
    try {
        cars = await carService.getCars({
            category,
            query,
            minPrice,
            maxPrice,
            adas,
            sort
        });
    } catch (error) {
        console.error('BROWSE PAGE FETCH ERROR:', error);
    }

    return (
        <main className="min-h-screen bg-transparent relative">
            <Navbar />

            {/* Header spacing for fixed navbar */}
            <div className="h-32" />

            {/* Hero-like header for the Browse page */}
            <section className="relative py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-accent border border-border text-primary rounded-full text-[10px] font-black uppercase tracking-widest leading-none shadow-sm">
                        <span>Karachi Elite Catalog</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-none">
                        THE <span className="text-primary italic animate-pulse-slow">ELITE FLEET</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                        Discover the perfect vehicle for your journey in Karachi. From luxury sedans to powerful SUVs.
                    </p>
                </div>
                {/* Header Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] -z-10" />
            </section>

            {/* Main Content */}
            <section className="py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                    <SearchFilters />

                    {/* Car Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {cars && cars.length > 0 ? (
                            cars.map((car) => (
                                <CarCard key={car.id} car={car} />
                            ))
                        ) : (
                            <div className="col-span-full py-32 text-center space-y-6 bg-white/60 backdrop-blur-2xl rounded-[3rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 pointer-events-none" />
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                                <div className="text-7xl text-primary/20 drop-shadow-2xl relative z-10 animate-bounce-slow">🚗</div>
                                <div className="space-y-4 relative z-10">
                                    <h3 className="text-3xl font-black text-foreground tracking-tighter uppercase">No vehicles available</h3>
                                    <p className="text-muted-foreground font-medium text-lg max-w-md mx-auto">Try adjusting your elite filters or search terms to find the perfect ride for your journey.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
