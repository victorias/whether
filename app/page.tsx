import Header from "./Header";
import Weather from "./Weather";

async function getInitialCurrentWeatherData() {
  const location = `Dolores%20Park`;
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/?unitGroup=us&key=WAAK2EVX4LK7SB5FSJXLSWTVK&contentType=json`,
    {
      method: "GET",
      headers: {},
    }
  );
}

export default function Home() {
  return (
    <main>
      <Header />
      <Weather />
    </main>
  );
}
