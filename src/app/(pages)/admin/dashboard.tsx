'use client';

import { Line, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const incidentsData = [
  {
    region: "Addis Ababa",
    category: "Road Accident",
    date: "2024-10-01T08:30:00Z",
  },
  {
    region: "Oromia",
    category: "Domestic Violence",
    date: "2024-09-22T15:00:00Z",
  },
  {
    region: "Amhara",
    category: "Campus Conflict",
    date: "2024-10-05T10:45:00Z",
  },
  {
    region: "Tigray",
    category: "Corruption",
    date: "2024-08-15T12:00:00Z",
  },
  {
    region: "Sidama",
    category: "Agricultural Incident",
    date: "2024-07-20T14:30:00Z",
  },
  {
    region: "SNNPR",
    category: "Healthcare Incident",
    date: "2024-09-10T17:00:00Z",
  },
  {
    region: "Gambela",
    category: "Theft",
    date: "2024-08-30T09:00:00Z",
  },
  {
    region: "Benishangul-Gumuz",
    category: "Domestic Violence",
    date: "2024-06-12T11:30:00Z",
  },
  {
    region: "Harari",
    category: "Academic Fraud",
    date: "2024-09-18T13:30:00Z",
  },
  {
    region: "Dire Dawa",
    category: "Elder Abuse",
    date: "2024-10-02T16:15:00Z",
  },
];

const getTotalCount = (field: string): number => {
  return new Set(
    incidentsData.map((incident) => incident[field as keyof typeof incident])
  ).size;
};

interface MonthData {
  [key: string]: {
    [key: string]: number;
  };
}

interface RegionData {
  [key: string]: number;
}

interface CategoryData {
  [key: string]: number;
}

const getIncidentsByRegionAndMonth = (): {
  regionData: RegionData;
  monthData: MonthData;
} => {
  const regionData: RegionData = {};
  const monthData: MonthData = {};

  incidentsData.forEach((incident) => {
    const month = new Date(incident.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    const region = incident.region;

    if (!regionData[region]) {
      regionData[region] = 0;
    }
    regionData[region]++;

    if (!monthData[month]) {
      monthData[month] = {};
    }
    if (!monthData[month][region]) {
      monthData[month][region] = 0;
    }
    monthData[month][region]++;
  });

  return { regionData, monthData };
};

const getCategoryDistribution = (): CategoryData => {
  const categoryData: CategoryData = {};
  incidentsData.forEach((incident) => {
    const category = incident.category;
    categoryData[category] = (categoryData[category] || 0) + 1;
  });
  return categoryData;
};

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const lightness = Math.floor(Math.random() * 40) + 40; 
  return `hsl(${hue}, 100%, ${lightness}%)`;
};


const AdminDashboard = () => {
  const { regionData, monthData } = getIncidentsByRegionAndMonth();
  const categoryData = getCategoryDistribution();

  const months = Object.keys(monthData);
  const regions = Object.keys(regionData);

  const lineChartData = {
    labels: months,
    datasets: regions.map((region) => ({
      label: region,
      data: months.map((month) => monthData[month][region] || 0),
      borderColor: getRandomColor(),
      fill: false,
    })),
  };

  const polarChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Regions</h3>
          <p className="text-4xl">{getTotalCount("region")}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Categories</h3>
          <p className="text-4xl">{getTotalCount("category")}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Incidents</h3>
          <p className="text-4xl">{incidentsData.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-4xl">5</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1 bg-white p-6 rounded-lg shadow-md h-[500px]">
          <h3 className="text-xl font-semibold">Incidents by Region/Month</h3>
          <div className="h-[400px]">
          <Line data={lineChartData} options={{ responsive: true }} />
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 bg-white p-6 rounded-lg shadow-md h-[500px]">
          <h3 className="text-xl font-semibold">Incidents by Category</h3>
          <div className="h-[400px]">

          <PolarArea data={polarChartData} options={{ responsive: true, maintainAspectRatio: false }}  style={{ height: '400px', width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
