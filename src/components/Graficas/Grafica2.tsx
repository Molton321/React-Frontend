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

        // Extraer valores y etiquetas
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
      width: 380,
      type: 'donut',
    },
    labels: labels,
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
      formatter: function (val: string, opts: any) {
        return `${val} - ${opts.w.globals.series[opts.seriesIndex]}`;
      },
    },
    title: {
      text: 'Ventas por categoría',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="donut" width={380} />
    </div>
  );
};

export default Grafica2;
