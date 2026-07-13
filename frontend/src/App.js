import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import MentorProfilePage from "./pages/MentorProfile";
import MentorDiscoveryPage from "./pages/MentorDiscovery";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mentors" element={<MentorDiscoveryPage />} />
          <Route path="/mentors/:id" element={<MentorProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
