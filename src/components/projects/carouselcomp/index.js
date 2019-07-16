import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './index.css'
import { Link } from "react-router-dom";

class CarouselComp extends React.Component {
  render() {
    var styles = this.props.mode==="light" ? {backgroundColor: '#fff',marginBottom:20}: {backgroundColor: '#5A6065',marginBottom:20, color: '#fff'};
    var color = this.props.mode==="light" ? "textSecondary": '#fff';
    return (
      <div className="">
        <div className="backBtn">
          <Link  to="/projects">
            Back
          </Link>
        </div>
        <div>
          <h3>
            {this.props.project.title}
          </h3>
        </div>
        <div className="carousel_Container">
          <div className="left">
            <Carousel className="centerCarousel" showIndicators={false} showThumbs={false}>
            {
              this.props.project.img.map(function(item, i){
                return (
                  <div key={i}>
                    <img style={item.style} src={item.src} />
                  </div>
                );
              })
            }
            </Carousel>
          </div>
          <div className="right">
            {this.props.project.description}
          </div>
        </div>
        <hr className="hide-at-lg"/>
      </div>
    );
  }
}

export default CarouselComp;
