import React from "react";
import Hero from "./Hero/Hero";
import ContactUs from "./ContactUs/ContactUs";
import Feature from "./Feature/Feature";
// import Footer from "./Footer/Footer";
import OurTeam from "./OurTeam/OurTeam";
import "../../assets/Images/ahmad.jpg";

function Home() {
  return (
    <>
      <Hero />
      <Feature />
      <OurTeam />
      <ContactUs />
      {/* <Footer /> */}
    </>
  );
}

export default Home;
