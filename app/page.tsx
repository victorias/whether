import Header from "@/weather/Header";
import WeatherContainer from "@/weather/WeatherContainer";
import { Menu } from "react-feather";

export default function Home() {
  return (
    <main className="flex flex-col">
      <header className="flex justify-between p-4">
        <div className="text-sm text-red-400">whether.io</div>
        <div className="md:hidden">
          <Menu />
        </div>
        <div className="text-sm hidden md:flex">
          <button>Help</button>
          <button className="ml-3">Sign Out</button>
        </div>
      </header>
      <div className="flex flex-col md:w-3/4 self-center">
        <Header />
        <WeatherContainer />
      </div>
    </main>
  );
}
