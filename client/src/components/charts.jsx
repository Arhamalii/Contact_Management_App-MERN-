import React from "react";
import ApexChart from "react-apexcharts";
import { useContact } from "../context/contactContext/state";

const PieChart = () => {
  const { relation } = useContact();

  const personalContacts = relation?.personal?.length || 0;
  const professionalContacts = relation?.professional?.length || 0;

  const series = [personalContacts, professionalContacts];

  const options = {
    chart: {
      type: "pie",
      width: "100%",
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    colors: ["#4ade80", "#0ea5e9"], // Colors for the pie chart
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="h-[10vh]">
      <ApexChart options={options} series={series} type="pie" height={270} />
    </div>
  );
};

export default PieChart;
