"use client";
import { VisualCrossingResponse } from "@/api/types";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { startOfWeek, add, format } from "date-fns";

const fetchWeatherData = async (
  location: string,
  onDate: string
): Promise<VisualCrossingResponse> => {
  const res = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${onDate}/?unitGroup=us&key=WAAK2EVX4LK7SB5FSJXLSWTVK&contentType=json`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Weather Data");
  }

  return res.json();
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

  return <div>{data.address}</div>;
};

export default Weather;
