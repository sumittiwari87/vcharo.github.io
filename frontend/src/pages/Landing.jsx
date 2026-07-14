import Navbar from '../components/vcharo/Navbar';
import Hero from '../components/vcharo/Hero';
import ProblemSolution from '../components/vcharo/ProblemSolution';
import HowItWorks from '../components/vcharo/HowItWorks';
import Categories from '../components/vcharo/Categories';
import WhyVcharo from '../components/vcharo/WhyVcharo';
import FeaturedMentors from '../components/vcharo/FeaturedMentors';
import Testimonials from '../components/vcharo/Testimonials';
import ForMentors from '../components/vcharo/ForMentors';
import Pricing from '../components/vcharo/Pricing';
import FAQ from '../components/vcharo/FAQ';
import CTABand from '../components/vcharo/CTABand';
import Footer from '../components/vcharo/Footer';
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
        <WhyVcharo />
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
