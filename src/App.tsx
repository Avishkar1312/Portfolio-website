import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Terminal from './components/Terminal';
import ProjectPlayground from './components/ProjectPlayground';

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <Hero 
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenPlayground={() => setIsPlaygroundOpen(true)}
      />
      <About />
      <Education />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      
      <Terminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
      
      <ProjectPlayground 
        isOpen={isPlaygroundOpen} 
        onClose={() => setIsPlaygroundOpen(false)} 
      />
    </div>
  );
}

export default App;