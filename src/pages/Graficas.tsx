import Breadcrumb from '../components/Breadcrumb';
import Grafica1 from '../components/Graficas/Grafica1';
import Grafica2 from '../components/Graficas/Grafica2';
import Grafica3 from '../components/Graficas/Grafica3';

const Graficas = () => {
  return (
    <>
      <Breadcrumb pageName="¿Cómo va mi negocio?" />

      <div className="flex flex-col gap-10">
        <Grafica1 />
        <Grafica2 />
        <Grafica3 />
      </div>
    </>
  );
};

export default Graficas;
