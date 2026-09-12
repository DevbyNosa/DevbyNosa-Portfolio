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


export default function Home() {
   return (
    <>
    <Navbar />

    <Hero />
    <TechStrip />
    <About />
    <WorkExperience />
    <Projects />
    <Writing />
    <Contact />
    <Footer />
    </>
    
   )
}