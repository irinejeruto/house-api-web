import Navbar from "@/components/Navbar";
import PredictionWidget from "@/components/PredictionWidget";
import Image from "next/image";
import houseImage from "./images/house.jpg";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 lg:pt-40 lg:pb-48 px-4 overflow-hidden min-h-[80vh] flex flex-col justify-center">
        {/* Background House Image */}
        <div className="absolute inset-0 z-0">
            {/* Dark overlay for white text readability */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <Image
                src={houseImage}
                alt="Modern House"
                fill
                priority
                placeholder="blur"
                className="object-cover object-center"
                sizes="100vw"
            />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center mt-8">
            <h2 className="text-sm font-medium tracking-widest uppercase mb-6 text-white/90">
              Small living, supersized.
            </h2>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white mb-8 max-w-4xl mx-auto leading-[1.1]">
              Your Path to a <br className="hidden md:block" />
              <span className="font-medium">Fulfilling Life</span>
            </h1>

            <p className="text-lg text-white/90 max-w-xl mx-auto mb-12 leading-relaxed font-medium">
              Your dream home, made easy with personalized property solutions
              and accurate price predictions powered by data analytics.
            </p>
        </div>
      </section>

      {/* Prediction Widget Section */}
      <div id="prediction-model" className="scroll-mt-24 relative z-20">
        <PredictionWidget />
      </div>
      
      {/* Spacer for bottom scroll */}
      <div className="h-24 bg-white"></div>
    </main>
  );
}
