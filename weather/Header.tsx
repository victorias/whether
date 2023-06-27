"use client";
import Dropdown from "@/components/Dropdown";
import TextInput from "@/components/TextInput";
import {
  DayOfWeekOptions,
  TimeOfDayOptions,
  useWhetherStore,
} from "@/stores/useWhetherStore";
import { Clock, MapPin } from "react-feather";

const Header = () => {
  const selectedTimeOfDay = useWhetherStore((state) => state.timeOfDay);
  const selectedDayOfWeek = useWhetherStore((state) => state.dayOfWeek);
  const selectedLocation = useWhetherStore((state) => state.location);

  const setSelectedDayOfWeek = useWhetherStore((state) => state.setDayOfWeek);
  const setSelectedTimeOfDay = useWhetherStore((state) => state.setTimeOfDay);
  const setSelectedLocation = useWhetherStore((state) => state.setLocation);
  return (
    <section className="flex flex-col md:flex-row p-4 md:items-center border-b-2 border-black">
      <div className="flex align-center md-2">
        <div className="py-4">
          <MapPin color="black" />
        </div>
        <TextInput
          initialValue={selectedLocation}
          onBlur={(location) => {
            setSelectedLocation(location);
          }}
          onKeyPressEnter={(location) => setSelectedLocation(location)}
          placeholder="Enter a city name.."
        />
      </div>
      <div className="flex align-center">
        <div className="flex align-center">
          <div className="py-2">
            <Clock color="black" />
          </div>
          <Dropdown
            options={DayOfWeekOptions}
            onOptionSelect={(option) => setSelectedDayOfWeek(option)}
            displayedText={`Every ${selectedDayOfWeek}`}
          />
        </div>
        <div>
          <Dropdown
            options={TimeOfDayOptions}
            onOptionSelect={(option) => setSelectedTimeOfDay(option)}
            displayedText={selectedTimeOfDay}
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
