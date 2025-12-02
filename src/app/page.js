"use client"

import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import { GlobalStateProvider } from "./context";
import CarolPage from "./components/CarolPage";
import Speakers from "./components/Speakers";
import Footer from "./components/Footer";



export default function Home() {
  return (
    <div>
      <GlobalStateProvider>
        <Navbar/>
        <Hero/>
        <About/>
        <CarolPage/>
        <Speakers/>
        <Footer/>
      </GlobalStateProvider>
      

    </div>
  );
}
