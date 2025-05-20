import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  time: string;
  price: string;
  discount: string;
  discountClass?: string;
}

const ProductCard = ({ imageUrl, title, time, price, discount, discountClass }: ProductCardProps) => {
  return (
    <div className="bg-[#cfcfcf33] rounded-xl overflow-hidden shadow-md h-full">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
        <span
          className={`absolute top-2 left-2 bg-gray  text-[11px] text-[#1887FF] font-bold px-2 py-0.5 rounded-full shadow-sm ${discountClass}`}
        >
          {discount}
        </span>
      </div>
      <div className="p-3 dark:bg-meta-4">
        <h3 className="font-semibold text-sm text-gray-800 mb-1 truncate dark:text-white">{title}</h3>
        <div className="text-xs text-gray-800  flex items-center gap-3">
          <span className="dark:text-white">⏰ {time}</span>
          <span className="dark:text-white">💰 {price}</span>
        </div>
      </div>
    </div>
  );
};
const ProductSlider = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 2.2,
          spacing: 16,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3.2,
          spacing: 16,
        },
      },
    },
  });

  const cards = [
    {
      imageUrl: "https://www.elespectador.com/resizer/v2/ZQUGSWWM2BBZXHEPBPMRIWX46U.jpg?auth=fba19f13a18b1a314f32e083e9d0727fbbe153571721015b63a21613680c519e&width=920&height=613&smart=true&quality=60",
      title: "Hamburguesas Tierra Querida",
      time: "69 min",
      price: "$ 4.500",
      discount: "Hasta 27% Off",
    },
    {
      imageUrl: "https://images.rappi.com/restaurants_background/kfc1-1657753564446.jpg",
      title: "KFC - Pollo",
      time: "89 min",
      price: "$ 3.900",
      discount: "Hasta 33% Off",
    },
    {
      imageUrl: "https://images.rappi.com/restaurants_background/descarga-1672950741431.png",
      title: "Montolivo",
      time: "89 min",
      price: "$ 4.500",
      discount: "Hasta 24% Off",
    },
    {
      imageUrl: "https://myplate-prod.azureedge.us/sites/default/files/styles/large/public/2024-01/GreekSaladChicken2_527x323.jpg?itok=uQvq2bAg",
      title: "Ensalada Griega",
      time: "56 min",
      price: "$ 10.500",
      discount: "Hasta 10% Off",
    },
    {
      imageUrl: "https://polloseldorado.co/wp-content/uploads/2023/07/Imagenes-2.jpg",
      title: "Perro Caliente",
      time: "25 min",
      price: "$ 5.500",
      discount: "Hasta 25% Off",
    },
  ];

  return (
    <div className="px-4">
      <div ref={sliderRef} className="keen-slider">
        {cards.map((card, index) => (
          <div className="keen-slider__slide" key={index}>
            <ProductCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
