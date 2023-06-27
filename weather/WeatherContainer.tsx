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
    <section className="flex justify-center w-full">
      <div className="relative flex justify-center items-center w-screen">
        <div className="absolute left-0">
          {offset >= 2 && (
            <IconButton onClick={decreaseOffset}>
              <ChevronLeft color="black" />
            </IconButton>
          )}
        </div>
        <div className="flex justify-center flex-1 flex-col md:flex-row">
          <div className="p-4 md:flex-1 flex">
            <Weather useOffset={false} />
          </div>
          <div className="p-4 md:flex-1 flex">
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
