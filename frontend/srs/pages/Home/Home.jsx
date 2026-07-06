import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import Statistics from "../../components/home/Statistics";
import Features from "../../components/home/Features";
import Testimonials from "../../components/home/Testimonials";
import CTA from "../../components/home/CTA";
import Footer from "../../components/layout/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Statistics />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
      
      
    </>
  );
};

export default Home;
