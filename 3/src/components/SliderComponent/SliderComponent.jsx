// import React from "react";
import Slider from "react-slick";
import { Image } from "antd";

const SliderComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {arrImages.map((image, index) => (
        <div key={index}> {/* Thêm key vào đây */}
          <Image src={image} alt="Slide" preview={false} width="100%" height="750px" />
        </div>
      ))}
    </Slider>
  );
};

export default SliderComponent;
