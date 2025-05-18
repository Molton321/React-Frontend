import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const Grafica2 = () => {
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.VITE_GRAFICAS_URL}/grafica2`;
        const response = await axios.get(url);
        const data = response.data;

        const valores = data.map((item: any) => item.valor);
        const categorias = data.map((item: any) => item.categoria);

        setSeries(valores);
        setLabels(categorias);
      } catch (error) {
        console.error('Error al cargar datos de donut:', error);
      }
    };

    fetchData();
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      width: '100%', // 👈 importante para hacerla responsive
    },
    labels,
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      position: 'right',
      formatter: (val: string, opts: any) => {
        return `${val} - ${opts.w.globals.series[opts.seriesIndex]}`;
      },
    },
    title: {
      text: 'Ventas por categoría',
      style: {
        color: '#B0B0B0',
      },
    },
    responsive: [
      {
        breakpoint: 768, // mejor breakpoint para móviles
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-lg bg-white p-6 shadow-md dark:bg-boxdark">
      <ReactApexChart options={options} series={series} type="donut" />
    </div>
  );
};

export default Grafica2;
