
import { useState, useEffect } from 'react';
import { fetchPortfolioData } from './lib/api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Stats from './sections/Stats';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import ScrollToTop from './components/ScrollToTop';
import AdminApp from './admin/AdminApp';
import LoadingScreen from './components/LoadingScreen';
import AllProjects from './pages/AllProjects';
import AnimatedBackground from './components/AnimatedBackground';
import { SITEINFO_KEY, defaultSiteInfo } from './admin/tabs/SiteInfoTab';

// Read current settings synchronously from localStorage so theme applies instantly
const getInitialSettings = () => {
  try {
    const stored = localStorage.getItem(SITEINFO_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultSiteInfo.globalSettings, ...(parsed.globalSettings || {}) };
    }
  } catch {}
  return defaultSiteInfo.globalSettings;
};

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [globalSettings, setGlobalSettings] = useState(getInitialSettings);

  useEffect(() => {
    // Load config — localStorage already populated, Supabase syncs in background
    fetchPortfolioData(SITEINFO_KEY, defaultSiteInfo).then(info => {
      if (info.globalSettings) {
        setGlobalSettings({ ...defaultSiteInfo.globalSettings, ...info.globalSettings });
      }
      // Show loading for ~2.8s then reveal portfolio
      setTimeout(() => setLoading(false), 2800);
    });
  }, []);

  if (loading) return <LoadingScreen />;

  const themeClass = `min-h-screen bg-gray-950 text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-50 relative theme-${globalSettings.globalTheme || 'cyan'}`;

  return (
    <div className={themeClass}>
      {globalSettings.enableAnimatedBackground && <AnimatedBackground />}
      <Navbar />
      <main className="relative z-10">
        <Hero />
        {globalSettings.showStats && <Stats />}
        {globalSettings.showAbout && <About />}
        {globalSettings.showSkills && <Skills />}
        {globalSettings.showProjects && <Projects />}
        {globalSettings.showExperience && <Experience />}
        {globalSettings.showEducation && <Education />}
        {globalSettings.showContact && <Contact />}
      </main>
      <Footer className="relative z-10" />
      <FloatingContact />
      <ScrollToTop />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/admin" element={<AdminApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
