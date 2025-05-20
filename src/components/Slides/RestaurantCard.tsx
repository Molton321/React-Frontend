import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface RestaurantLogoProps {
  imageUrl: string;
}

const RestaurantLogo = ({ imageUrl }: RestaurantLogoProps) => {
  return (
    <div className="keen-slider__slide flex flex-col items-center text-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
        <img src={imageUrl} alt="Restaurant Logo" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

const RestaurantSlider = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 3.5,
      spacing: 12,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 5.5,
          spacing: 16,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 7.5,
          spacing: 20,
        },
      },
    },
    renderMode: "performance", // ayuda a prevenir problemas de superposición
  });

  const restaurants = [
    { imageUrl: "https://cdn.iconscout.com/icon/free/png-256/free-kfc-2-226243.png" },
    { imageUrl: "https://images.rappi.com/restaurants_logo/900006519-1505231570.png" },
    { imageUrl: "https://images.rappi.com/restaurants_logo/nuevologo-1678804198046.png" },
    { imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT5uebRCzFcbEoqInbpEVyX9MDiyg2Z9Pg-A&s" },
    { imageUrl: "https://www.corrillos.com.co//wp-content/uploads/2025/05/Corrillos-Frisby-860x480.jpg" },
    { imageUrl: "https://images.rappi.com/restaurants_logo/logo-1676148159596.png" },
    { imageUrl: "https://images.rappi.com/restaurants_logo/download-2-1617909428300-1618319846302.png" },
    { imageUrl: "https://images.rappi.com/restaurants_logo/40000219-1111.png" },
    { imageUrl: "https://images.rappi.com/restaurants_logo/sr-wok-logo1-1568821526912.png" },
    { imageUrl: "https://images.rappi.com/restaurants_logo/presto-logo1-1569006091492.png" },
  ];

  return (
    <div className="px-4 py-4 mt-3">
      <div ref={sliderRef} className="keen-slider">
        {restaurants.map((rest, index) => (
          <RestaurantLogo key={index} {...rest} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantSlider;
