import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const Grafica3 = () => {
  const [series, setSeries] = useState<any[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.VITE_GRAFICAS_URL}/grafica3`;
        const response = await axios.get(url);
        const data = response.data;

        // JSON esperado:
        // {
        //   labels: ['01 Jan', '02 Jan', ...],
        //   series: [
        //     { name: 'Session Duration', data: [...] },
        //     { name: 'Page Views', data: [...] },
        //     { name: 'Total Visits', data: [...] }
        //   ]
        // }

        setLabels(data.labels);
        setSeries(data.series);
      } catch (error) {
        console.error('Error al cargar datos de la gráfica de líneas:', error);
      }
    };

    fetchData();
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 7, 5],
      curve: 'straight',
      dashArray: [0, 8, 5],
    },
    title: {
      text: 'Page Statistics',
      align: 'left',
    },
    legend: {
      tooltipHoverFormatter: function (val: string, opts: any) {
        return `${val} - ${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]}`;
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: labels,
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val: any) {
              return val + ' (mins)';
            },
          },
        },
        {
          title: {
            formatter: function (val: any) {
              return val + ' per session';
            },
          },
        },
        {
          title: {
            formatter: function (val: any) {
              return val;
            },
          },
        },
      ],
    },
    grid: {
      borderColor: '#f1f1f1',
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default Grafica3;
