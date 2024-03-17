import React from "react";
import "../Feature/feature.css";
import FeatureBox from "./FeatureBox";
import feature1 from "../../../assets/Images/Feature.jpg";

function Feature() {
  return (
    <div id="box-container">
      <h2 id="htext">Features</h2>
      <FeatureBox
        image={feature1}
        header="From few to a fandom"
        paragraph="Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more."
      />
      <FeatureBox
        image={feature1}
        header="Where hanging out is easy"
        paragraph="Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call."
      />
    </div>
  );
}

export default Feature;
