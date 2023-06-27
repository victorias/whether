"use client";
import { VisualCrossingResponse } from "@/api/types";
import { startOfWeek, add, format, fromUnixTime, getHours } from "date-fns";
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
import annotationPlugin from "chartjs-plugin-annotation";
import { Line } from "react-chartjs-2";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";
import { useWhetherStore } from "@/stores/useWhetherStore";
import useSWR from "swr";
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Moon,
  Sun,
  Umbrella,
  Wind,
} from "react-feather";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const fullConfig = resolveConfig(tailwindConfig);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
    annotation: {
      annotations: {
        left: {
          type: "line",
          xMin: 2,
          xMax: 2,
          borderColor: "rgb(0,0, 0)",
          borderWidth: 2,
          borderDash: [3],
        },
        right: {
          type: "line",
          xMin: 7,
          xMax: 7,
          borderColor: "rgb(0, 0, 0)",
          borderWidth: 2,

          borderDash: [3],
        },
      },
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

const fetchWeatherData = async (
  location: string,
  onDate: string
): Promise<VisualCrossingResponse> => {
  const res = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
      location
    )}/${onDate}/?unitGroup=us&include=stats%2Cobs%2Cremote%2Cstatsfcst%2Cfcst%2Chours&key=TBLDFJEDDJHYPBVMJB3NHVHBG&contentType=json`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Weather Data");
  }

  return res.json();
};

const timeOfDayMap = {
  Morning: [8, 12],
  Afternoon: [12, 17],
  Evening: [17, 21],
};

const WeatherChart = ({
  responseData,
}: {
  responseData: VisualCrossingResponse;
}) => {
  const timeOfDay = useWhetherStore((state) => state.timeOfDay);

  if (responseData.days[0].hours == null) {
    return <div>no data</div>;
  }

  // Slice data set to be Time of Day +/- 2 hours
  const slicedData = responseData.days[0].hours.filter((hour) => {
    const h = getHours(fromUnixTime(hour.datetimeEpoch));
    return (
      h > timeOfDayMap[timeOfDay][0] - 3 && h < timeOfDayMap[timeOfDay][1] + 3
    );
  });

  const labels = slicedData.map((hour) => {
    const h = getHours(fromUnixTime(hour.datetimeEpoch));
    // Determine if it's AM or PM
    const period = h >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    const convertedHours = h % 12 || 12;

    // Return the converted time
    return `${convertedHours} ${period}`;
  });

  return (
    <div style={{ flex: "0 0 auto" }} className="w-full h-96">
      <Line
        options={chartOptions}
        data={{
          labels,
          datasets: [
            {
              label: "Temperature (°F)",
              data: slicedData.map((hour) => hour.temp),
              cubicInterpolationMode: "default",
              borderColor: fullConfig.theme?.colors?.red["200"],
              backgroundColor: fullConfig.theme?.colors?.red["200"],
            },
            {
              label: "Windspeed (mph)",
              data: slicedData.map((hour) => hour.windspeed),
              cubicInterpolationMode: "default",
              borderColor: fullConfig.theme?.colors.green["200"],
              backgroundColor: fullConfig.theme?.colors.green["200"],
            },

            {
              label: "Precipitation",
              cubicInterpolationMode: "default",
              data: slicedData.map((hour) => hour.precip),
              borderColor: fullConfig.theme?.colors.blue["200"],
              backgroundColor: fullConfig.theme?.colors.blue["200"],
            },
          ],
        }}
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
};

const weatherIconMap = {
  snow: <CloudSnow size={48} />,
  rain: <CloudRain size={48} />,
  fog: <Cloud size={48} />,
  wind: <Wind size={48} />,
  cloudy: <Cloud size={48} />,
  "partly-cloudy-day": <Sun size={48} />,
  "partly-cloudy-night": <Cloud size={48} />,
  "clear-day": <Sun size={48} />,
  "clear-night": <Moon size={48} />,
};

interface WeatherProps {
  useOffset: boolean;
}

const Weather = ({ useOffset }: WeatherProps) => {
  const location = useWhetherStore((state) => state.location);
  const offset = useWhetherStore((state) => state.offset);
  const timeOfDay = useWhetherStore((state) => state.timeOfDay);

  const getNextDate = () => {
    // Get the current date
    const currentDate: Date = new Date();

    // Find the start of the week (Sunday)
    const startOfCurrentWeek: Date = startOfWeek(currentDate);

    const targetDay: string = "Friday";

    // Initialize a counter for adding days
    let daysToAdd: number = 0;

    // Iterate from the start of the week to find the next occurrence of the target day
    let nextDate: Date;
    while (true) {
      nextDate = add(startOfCurrentWeek, { days: daysToAdd });
      const dayName: string = format(nextDate, "EEEE");

      if (dayName === targetDay) {
        if (!useOffset) return nextDate;
        break;
      }

      daysToAdd++;
    }

    // Add offset * 7 to get the future date
    return add(nextDate, { days: 7 * offset });
  };

  const nextDate = getNextDate();
  const formattedNextDate = format(nextDate, "yyyy-MM-dd");

  const { data, error, isLoading } = useSWR(
    `${location}+${formattedNextDate}`,
    () => fetchWeatherData(location, formattedNextDate),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return (
      <span>
        Error: {error instanceof Error ? error.message : "Unhandled Exception"}
      </span>
    );
  }

  // use the middle of the time of day to show the data
  // this could also be the general day data.. but there becomes an odd inconsistency
  // when the overall day forecast is actually significantly different than the
  // time of day forecast
  const timepoint = Math.round(
    (timeOfDayMap[timeOfDay][1] - timeOfDayMap[timeOfDay][0]) / 2
  );

  const hour = data?.days[0].hours[timepoint];

  return (
    <div className="flex flex-col w-full flex-1 items-stretch">
      <h2 className={`text-lg ${!useOffset ? "text-red-400" : ""}`}>
        {!useOffset
          ? format(nextDate, "'This' eeee 'the' do")
          : format(nextDate, "'Next' eeee 'the' do")}
      </h2>
      {hour && (
        <div className="flex">
          {weatherIconMap[hour.icon as keyof typeof weatherIconMap]}
          <div className="flex-col ml-2">
            <div className="text-base">
              {hour.conditions} {hour.temp}°F
            </div>
            <div className="text-sm flex items-center">
              <Wind />
              <div className="ml-2">winds {hour.windspeed}mph</div>
            </div>

            <div className="text-sm flex items-center">
              <Umbrella />
              <div className="ml-2">
                {hour.precipprob === 0
                  ? "no rain"
                  : `${hour.precipprob}% chance of rain`}
              </div>
            </div>
          </div>
        </div>
      )}

      {data && <WeatherChart responseData={data} />}
    </div>
  );
};

export default Weather;
