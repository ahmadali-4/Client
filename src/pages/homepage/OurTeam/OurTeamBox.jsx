import React from "react";
import "../OurTeam/OurTeam.css";

function OurTeamBox(props){
    return(
          <div className="column">
            <div className="card">
            <div className="img-container">
              <img src={props.image} />
            </div>
            <h3>{props.name}</h3>
            <p>{props.title}</p>
            <h3>Skills</h3>
            <p>{props.skills}</p>
            <div className="icons">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
              <a href="#">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          </div>
    );
}
  
export default OurTeamBox;