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

  const setSelectedDayOfWeek = useWhetherStore((state) => state.setDayOfWeek);
  const setSelectedTimeOfDay = useWhetherStore((state) => state.setTimeOfDay);
  return (
    <>
      <TextInput />
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
