import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const Grafica1 = () => {
  const [series, setSeries] = useState([{ data: [] }]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.VITE_GRAFICAS_URL}/grafica1`;
        console.log(url);
        
        const response = await axios.get(url);
        console.log(response);
        
        const data = response.data;

        // Suponiendo que el JSON tiene la forma:
        // [{ nombre: "Ventas", valor: 1200 }, { nombre: "Clientes", valor: 900 }, ...]

        const valores = data.map((item: any) => item.valor);
        const nombres = data.map((item: any) => item.nombre);

        setSeries([{ data: valores }]);
        setCategories(nombres);
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    };

    fetchData();
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 380,
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7'],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff'],
      },
      formatter: function (val, opt) {
        return categories[opt.dataPointIndex] + ": " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    xaxis: {
      categories,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    title: {
      text: 'Ventas por cada día de la semana',
      align: 'center',
      floating: true,
    },
    subtitle: {
      text: 'Indicadores clave representados horizontalmente',
      align: 'center',
    },
    tooltip: {
      theme: 'dark',
      x: { show: false },
      y: {
        title: {
          formatter: () => '',
        },
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={380} />
    </div>
  );
};

export default Grafica1;
