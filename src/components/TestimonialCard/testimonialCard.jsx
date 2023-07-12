import React from "react";
import "./testimonialCard.css";
import { images } from "../../constants";
import { useHomeContext } from "../../context/home_context";

const TestimonialCard = (props) => {
  const testimonial = props.testimonial;

  return (
    <div>
      {testimonial && testimonial !== undefined ?
       
            
              <div className="testimonials_single_card">
                <img
                  src={testimonial.image_full_path}
                  alt="testimonials_img01"
                  className="testimonials_card_img"
                />
                <img
                  src={images.medex_stars01}
                  alt="medex_stars01"
                  className="testimonials_stars"
                />
                <p className="testimonials_card_heading">{testimonial.description}</p>
                <p className="testimonials_card_dis">{testimonial.name}</p>
              </div>
            
        
        : null}
    </div>
  );
};

export default TestimonialCard;
