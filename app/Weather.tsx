"use client";
import { Hour, VisualCrossingResponse } from "@/api/types";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { startOfWeek, add, format } from "date-fns";
import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  response: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      display: false,
    },
    x: {
      grid: {
        // display: false,
      },
    },
  },
};

const fullConfig = resolveConfig(tailwindConfig);

const fetchWeatherData = async (
  location: string,
  onDate: string
): Promise<VisualCrossingResponse> => {
  const res = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${onDate}/?unitGroup=us&key=WAAK2EVX4LK7SB5FSJXLSWTVK&contentType=json&include=hours`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Weather Data");
  }

  return res.json();
};

const WeatherChart = ({
  responseData,
}: {
  responseData: VisualCrossingResponse;
}) => {
  const labels = responseData.days[0].hours.map((hour) => hour.datetime);

  return (
    <Line
      options={chartOptions}
      data={{
        labels,
        datasets: [
          {
            label: "Temperature (°F)",
            data: responseData.days[0].hours.map((hour) => hour.temp),
            cubicInterpolationMode: "default",
            borderColor: fullConfig.theme?.colors?.red["200"],
            backgroundColor: fullConfig.theme?.colors?.red["200"],
          },
          {
            label: "Windspeed (mph)",
            data: responseData.days[0].hours.map((hour) => hour.windspeed),
            cubicInterpolationMode: "default",
            borderColor: fullConfig.theme?.colors.green["200"],
            backgroundColor: fullConfig.theme?.colors.green["200"],
          },

          {
            label: "Precipitation",
            cubicInterpolationMode: "default",
            data: responseData.days[0].hours.map((hour) => hour.precip),
            borderColor: fullConfig.theme?.colors.blue["200"],
            backgroundColor: fullConfig.theme?.colors.blue["200"],
          },
        ],
      }}
    />
  );
};

const Weather = () => {
  const location = `Dolores%20Park`;

  const getNextDayOfWeek = () => {
    // Get the current date
    const currentDate: Date = new Date();

    // Find the start of the week (Sunday)
    const startOfCurrentWeek: Date = startOfWeek(currentDate);

    const targetDay: string = "Friday";

    // Initialize a counter for adding days
    let daysToAdd: number = 0;

    // Iterate from the start of the week to find the next occurrence of the target day
    while (true) {
      const nextDate: Date = add(startOfCurrentWeek, { days: daysToAdd });
      const dayName: string = format(nextDate, "EEEE");

      if (dayName === targetDay) {
        return nextDate;
      }

      daysToAdd++;
    }
  };

  const nextDate = getNextDayOfWeek();
  const formattedNextDate = format(nextDate, "yyyy-MM-dd");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["weather", { location, formattedNextDate }],
    queryFn: () => fetchWeatherData(location, formattedNextDate),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  console.log(data);

  return (
    <div className="h-screen">
      {data.address}
      <WeatherChart responseData={data} />
    </div>
  );
};

export default Weather;
