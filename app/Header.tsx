"use client";
import Dropdown from "@/components/Dropdown";
import TextInput from "@/components/TextInput";
import {
  DayOfWeekOptions,
  TimeOfDayOptions,
  useWhetherStore,
} from "@/stores/useWhetherStore";

const Header = () => {
  const selectedTimeOfDay = useWhetherStore((state) => state.timeOfDay);
  const selectedDayOfWeek = useWhetherStore((state) => state.dayOfWeek);
  const selectedLocation = useWhetherStore((state) => state.location);

  const setSelectedDayOfWeek = useWhetherStore((state) => state.setDayOfWeek);
  const setSelectedTimeOfDay = useWhetherStore((state) => state.setTimeOfDay);
  const setSelectedLocation = useWhetherStore((state) => state.setLocation);
  return (
    <>
      <TextInput
        initialValue={selectedLocation}
        onBlur={(location) => {
          setSelectedLocation(location);
        }}
        onKeyPressEnter={(location) => setSelectedLocation(location)}
        placeholder="Enter a city name.."
      />
      <Dropdown
        options={DayOfWeekOptions}
        onOptionSelect={(option) => setSelectedDayOfWeek(option)}
        displayedText={`Every ${selectedDayOfWeek}`}
      />
      <Dropdown
        options={TimeOfDayOptions}
        onOptionSelect={(option) => setSelectedTimeOfDay(option)}
        displayedText={selectedTimeOfDay}
      />
    </>
  );
};

export default Header;
