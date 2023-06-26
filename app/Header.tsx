"use client";
import Dropdown from "@/components/Dropdown";
import TextInput from "@/components/TextInput";
import { useState } from "react";

const TimeOfDayOptions = ["Morning", "Afternoon", "Evening"];
const DayOfWeekOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Header = () => {
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState(
    TimeOfDayOptions[0]
  );
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(
    DayOfWeekOptions[0]
  );
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
