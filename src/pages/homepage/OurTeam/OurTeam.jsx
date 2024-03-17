import React from "react";
import OurTeamBox from "../OurTeam/OurTeamBox";
import "../OurTeam/OurTeam.css";
import ahmad from "../../../assets/Images/ahmad.png";
import zuhair from "../../../assets/Images/Zuhair.png";
function OurTeam() {
  return (
    <div className="box-container">
      <div className="row">
        <h1>Our Team</h1>
      </div>
      <div className="row">
        <OurTeamBox
          image={zuhair}
          name="Muhammad Mumtaz"
          title="Front-end Developer"
          skills="JavaScript, CSS, HTML"
        />
        <OurTeamBox
          image={ahmad}
          name="Ahmad Ali"
          title="Full Stack Developer"
          skills="JavaScript, CSS, HTML, Java"
        />
        <OurTeamBox
          image={zuhair}
          name="Rana Muhmmad Zuhair"
          title="Backend Developer"
          skills="Java, Spring Boot"
        />
      </div>
    </div>
  );
}

export default OurTeam;
