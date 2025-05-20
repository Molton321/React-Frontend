import ProductSlider from "../../components/Slides/ProductCard";
import RestaurantSlider from "../../components/Slides/RestaurantCard";

const ECommerce = () => {
  return (
    <>
      
      <div className="px-4 mb-6">
  <h2 className="text-xl sm:text-2xl font-bold text-[#353343] dark:text-white mb-1">
     Descubre las mejores ofertas cerca de ti
  </h2>

</div>

        <ProductSlider/>
      
<div className="px-4 mt-12">
  <h2 className="text-xl sm:text-2xl font-bold text-[#353343] dark:text-white mb-1">
     Los 10 favoritos de la semana
  </h2>
    
</div>
    <RestaurantSlider/>
      
    </>
  );
};

export default ECommerce;
