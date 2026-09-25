import { useState, useEffect } from "react";
import Navbar from "../components/Header";
import Hero from "../components/Hero";
import TechStrip from "../components/strip";
import About from "../components/About";
import WorkExperience from "../components/experience";
import Projects from "../components/Projects";
import Writing from "../components/Writing";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useHomepageContent } from "../context/HomepageContent";
import SEO from "../components/SEO";


export default function Home() {
   const content = useHomepageContent();
   return (
    <>
      <SEO />
    <Navbar />

   <Hero content={content.hero} />
    <TechStrip />
   <About content={content.about} />
   <WorkExperience content={content.experience} />
    <Projects />
    <Writing />
   <Contact content={content.contact} />
    <Footer />
    </>
    
   )
}