import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CountdownSection from './components/CountdownSection';
import WeddingDetailsSection from './components/WeddingDetailsSection';
import GroomBrideSection from './components/GroomBrideSection';
import InvitationSection from './components/InvitationSection';
import Footer from './components/Footer';

function App() {
  return (
    <div
      className="w-full min-h-screen flex flex-col justify-between"
      style={{ selection: 'none' }}
    >
      <style>{`
        ::selection {
          background: rgba(196, 154, 74, 0.25);
          color: #3D2610;
        }
      `}</style>
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CountdownSection />
        <WeddingDetailsSection />
        <GroomBrideSection />
        <InvitationSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;