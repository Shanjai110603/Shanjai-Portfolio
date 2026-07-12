
import { useState, useEffect, lazy, Suspense } from 'react';
import { fetchPortfolioData } from './lib/api';
import { STORAGE_KEYS } from './lib/constants';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Always-needed (above the fold)
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import LoadingScreen from './components/LoadingScreen';
import AnimatedBackground from './components/AnimatedBackground';
import ScrollProgressBar from './components/ScrollProgressBar';
import HireMeCTA from './components/HireMeCTA';
import ErrorBoundary from './components/ErrorBoundary';
import FloatingContact from './components/FloatingContact';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import CyberTerminal from './components/CyberTerminal';

// Lazy-load everything below the fold → faster initial paint
const Stats = lazy(() => import('./sections/Stats'));
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const GitHubStats = lazy(() => import('./sections/GitHubStats'));
const Experience = lazy(() => import('./sections/Experience'));
const Education = lazy(() => import('./sections/Education'));
const Blog = lazy(() => import('./sections/Blog'));
const Playground = lazy(() => import('./sections/Playground'));
const Contact = lazy(() => import('./sections/Contact'));

// Route-level chunks
const AdminApp = lazy(() => import('./admin/AdminApp'));
const AllProjects = lazy(() => import('./pages/AllProjects'));

// Import defaultSiteInfo from source of truth (admin tab) but key from constants
import { defaultSiteInfo } from './admin/tabs/SiteInfoTab';
const SITEINFO_KEY = STORAGE_KEYS.siteInfo;

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

// Lightweight section skeleton shown while lazy sections load
const SectionFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white/40 animate-spin" />
  </div>
);

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [siteInfo, setSiteInfo] = useState(() => {
    try {
      const stored = localStorage.getItem(SITEINFO_KEY);
      return stored ? JSON.parse(stored) : defaultSiteInfo;
    } catch {
      return defaultSiteInfo;
    }
  });

  useEffect(() => {
    fetchPortfolioData(SITEINFO_KEY, defaultSiteInfo).then(info => {
      if (info) {
        setSiteInfo(info);
        if (info.siteTitle) {
          document.title = info.siteTitle;
        }
      }
      setTimeout(() => setLoading(false), 2800);
    });
  }, []);

  if (loading) return <LoadingScreen />;

  const globalSettings = siteInfo.globalSettings || defaultSiteInfo.globalSettings;
  const themeClass = `min-h-screen bg-gray-950 text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-50 relative theme-${globalSettings.globalTheme || 'cyan'}`;

  return (
    <div className={themeClass}>
      <ScrollProgressBar />
      {globalSettings.enableAnimatedBackground && <AnimatedBackground />}
      <Navbar siteInfo={siteInfo} />
      <main className="relative z-10">
        {/* Hero is eagerly loaded (above the fold) */}
        <Hero siteInfo={siteInfo} />
        {/* Everything below is lazy — only loaded when scrolled near */}
        <Suspense fallback={<SectionFallback />}>
          {globalSettings.showStats && <Stats />}
          {globalSettings.showAbout && <About siteInfo={siteInfo} />}
          {globalSettings.showSkills && <Skills />}
          {globalSettings.showProjects && <Projects />}
          <GitHubStats siteInfo={siteInfo} />
          {globalSettings.showExperience && <Experience />}
          {globalSettings.showEducation && <Education />}
          {globalSettings.showBlogs && <Blog />}
          {globalSettings.showPlayground && <Playground />}
          {globalSettings.showContact && <Contact siteInfo={siteInfo} />}
        </Suspense>
      </main>
      <Footer siteInfo={siteInfo} />
      <FloatingContact siteInfo={siteInfo} />
      <HireMeCTA />
      <ScrollToTop />
      {globalSettings.enableTerminalHUD !== false && <CyberTerminal />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/admin" element={<AdminApp />} />
            <Route path="/admin/*" element={<AdminApp />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
