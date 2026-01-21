
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import ScrollToTop from './components/ScrollToTop';
import { motion } from 'framer-motion';

function App() {

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-cyan-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
      <ScrollToTop />
    </div>
  );
}

export default App;
