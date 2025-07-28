import React from 'react';

import './App.css';

import TrueFocus from './components/Animations/TrueFocus';

import RotatingText from './components/Animations/RotatingText'
import BlurText from './components/Animations/BlurText';
import Skills from './components/Skills';
import Project from './components/Projects';
import ScrollToTopButton from './components/ScrollToTopButton';
import Social from './components/Social';


// Import your images (make sure they exist in these paths)


function App() {
  

  return (
    <div className="max-w-screen">

     

    
    <nav className="navbar sticky top-0 z-50 "id='nav'>
      <div className="logo">Suraj Tiwari</div>
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#skill">Skill</a>
        <a href="#Projects">Projects</a>
      </div>
    </nav>
  

      
      {/* Hero Section */}
      <div className="hero bg-gradient-to-br from-base-200 to-base-300 " style={{marginTop:'1.5rem'}} id='home'>
  <div className="hero-content flex-col lg:flex-row-reverse lg:gap-24 gap-10 px-6">
  {/* <div className="hero-content flex-col-reverse lg:flex-row-reverse lg:gap-24 gap-10 px-6"> */}

    {/* Profile Image */}
    <div className="lg:w-1/2 flex justify-center">
      <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-xl relative group">
        <img 
          src="./Data/resume/profilepic.jpeg" 
          alt="Profile" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"></div>
      </div>
    </div>

    {/* Text Content */}
    <div className="lg:w-1/2 text-center lg:text-left">
      <TrueFocus
        sentence="Suraj Tiwari"
        manualMode={false}
        blurAmount={2.5}
        borderColor="blue"
        animationDuration={0.5}
        pauseBetweenAnimations={0.5}
        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
      />
      {/* Enhanced RotatingText */}
      <h1 className="mt-12 lg:mt-16 flex flex-wrap items-center justify-center gap-3 text-center">
  <RotatingText
    texts={['Frontend', 'Backend', 'FullStack']}
    mainClassName="text-5xl md:text-6xl lg:text-7xl font-bold text-black overflow-hidden"
    splitLevelClassName="overflow-hidden pb-1"
    elementLevelClassName="text-2xl md:text-7xl lg:text-6xl"
    staggerFrom="last"
    initial={{ y: "150%" }}
    animate={{ y: 0 }}
    exit={{ y: "-150%" }}
    staggerDuration={0.035}
    transition={{
      type: "spring",
      damping: 25,
      stiffness: 350,
      mass: 0.5,
    }}
    rotationInterval={2500}
  />
  <span className="text-2xl md:text-6xl lg:text-5xl font-extrabold text-black">
    Developer
  </span>
</h1>
<BlurText
  text="Full-stack developer passionate about crafting responsive, high-performance web apps."
  delay={100}
  animateBy="words"
  direction="top"
  className="text-xl md:text-xl font-medium text-black leading-relaxed mb-8 text-center lg:text-left custom"
 />

      
      
<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">

        <a href="./Data/resume/Suraj Tiwari Resume.pdf" download className="btn bg-black text-white px-8 py-3 text-lg shadow-md hover:scale-105 transition-transform">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
</svg>My Resume
        </a>
        <a href="#Projects" className="btn btn-outline px-8 py-3 text-lg shadow-md hover:scale-105 transition-transform">
          View My  Work
        </a>
      </div>


    </div>
  </div>
</div>
    <Social/>

    <ScrollToTopButton/>

      
      <Skills/>

      
      <Project/>
      


      
    </div>
  );
}

export default App;