import Header from "./Header";

async function getInitialWeatherData() {
  const response = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/bellevue?unitGroup=us&key=WAAK2EVX4LK7SB5FSJXLSWTVK&contentType=json",
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
    </main>
  );
}
