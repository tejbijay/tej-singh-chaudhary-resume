import Image from "next/image";
import About from "../components/About";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Blog from "../components/Blog";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 min-h-screen bg-white">
      <About />
      <Experience />
      <Skills />
      <Education />
      <Blog />
      <Contact />
    </div>
  );
}
