import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import homeImage1 from '../../utils/img-1.jpg';
import homeImage2 from '../../utils/img-2.jpg';
import homeImage3 from '../../utils/img-3.jpg';

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="">
      <Slider {...settings}>
        <div className="slide">
          <img src={homeImage1} alt="Home 1" className="slide-image" style={{ height: "85vh", width: "100vw" }} />
        </div>
        <div className="slide">
          <img src={homeImage2} alt="Home 2" className="slide-image" style={{ height: "85vh", width: "100vw" }} />
        </div>
        <div className="slide">
          <img src={homeImage3} alt="Home 3" className="slide-image" style={{ height: "85vh", width: "100vw" }} />
        </div>
      </Slider>
    </div>
  );
}

export default Home;
