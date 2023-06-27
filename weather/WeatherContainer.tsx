"use client";

import Weather from "@/weather/Weather";
import IconButton from "@/components/IconButton";
import { ChevronRight, ChevronLeft } from "react-feather";
import { useWhetherStore } from "@/stores/useWhetherStore";

const WeatherContainer = () => {
  const offset = useWhetherStore((state) => state.offset);
  const increaseOffset = useWhetherStore((state) => state.increaseOffset);
  const decreaseOffset = useWhetherStore((state) => state.decreaseOffset);

  return (
    <section className="flex justify-center flex-grow items-stretch">
      <div className="relative w-screen flex justify-center items-center">
        <div className="absolute left-0">
          {offset > 2 && (
            <IconButton onClick={decreaseOffset}>
              <ChevronLeft color="black" />
            </IconButton>
          )}
        </div>
        <div className="flex-grow flex justify-center">
          <div className="w-1/2 p-4">
            <Weather useOffset={false} />
          </div>
          <div className="hidden md:block w-1/2 p-4">
            <Weather useOffset />
          </div>
        </div>
        <div className="absolute right-0">
          <IconButton onClick={increaseOffset}>
            <ChevronRight color="black" />
          </IconButton>
        </div>
      </div>
    </section>
  );
};

export default WeatherContainer;
