import React from 'react'

export default function FeatureBox(props) {
  return (
    <div id='feature-container'>
        <div className="paragraph">
          <div className="paragraph-box">
          <h3>{props.header}</h3>
          <p>{props.paragraph}</p>
          </div>       
        </div>
        <div className="paragraph-image">
          <div className="paragraph-image-box">
            <img src={props.image} alt="" />
          </div>
        </div>
      </div>
  )
}
