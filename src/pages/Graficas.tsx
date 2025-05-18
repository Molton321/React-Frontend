import Breadcrumb from '../components/Breadcrumb';
import Grafica1 from '../components/Graficas/Grafica1';
import Grafica2 from '../components/Graficas/Grafica2';
import Grafica3 from '../components/Graficas/Grafica3';

const Graficas = () => {
  return (
    <>
      <Breadcrumb pageName="¿Cómo va mi negocio?" />

     <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
  {/* Gráfica 1: de barra horizontal, ocupa toda la fila */}
  <div className="col-span-12">
    <Grafica1 />
  </div>

  {/* Gráfica 2: donut */}
  <div className="col-span-12 md:col-span-6 xl:col-span-4">
    <Grafica2 />
  </div>

  {/* Gráfica 3: líneas estadísticas */}
  <div className="col-span-12 md:col-span-6 xl:col-span-8">
    <Grafica3 />
  </div>
</div>


    </>
  );
};

export default Graficas;
