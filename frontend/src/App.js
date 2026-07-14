import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import MentorProfilePage from "./pages/MentorProfile";
import MentorDiscoveryPage from "./pages/MentorDiscovery";
import HowItWorksPage from "./pages/HowItWorks";
import MenteeDashboardPage from "./pages/MenteeDashboard";
import MentorDashboardPage from "./pages/MentorDashboard";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/mentors" element={<MentorDiscoveryPage />} />
          <Route path="/mentors/:id" element={<MentorProfilePage />} />
          <Route path="/dashboard/mentee" element={<MenteeDashboardPage />} />
          <Route path="/dashboard/mentor" element={<MentorDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
