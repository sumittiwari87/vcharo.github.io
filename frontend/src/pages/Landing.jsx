import Navbar from '../components/vicharo/Navbar';
import Hero from '../components/vicharo/Hero';
import ProblemSolution from '../components/vicharo/ProblemSolution';
import HowItWorks from '../components/vicharo/HowItWorks';
import Categories from '../components/vicharo/Categories';
import WhyVicharo from '../components/vicharo/WhyVicharo';
import FeaturedMentors from '../components/vicharo/FeaturedMentors';
import Testimonials from '../components/vicharo/Testimonials';
import ForMentors from '../components/vicharo/ForMentors';
import Pricing from '../components/vicharo/Pricing';
import FAQ from '../components/vicharo/FAQ';
import CTABand from '../components/vicharo/CTABand';
import Footer from '../components/vicharo/Footer';
import { Toaster } from '../components/ui/sonner';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen paper-noise" data-testid="landing-page">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <Categories />
        <WhyVicharo />
        <FeaturedMentors />
        <Testimonials />
        <ForMentors />
        <Pricing />
        <FAQ />
        <CTABand />
      </main>
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
