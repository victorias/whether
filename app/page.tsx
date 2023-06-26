"use client";
import Dropdown from "@/components/Dropdown";
import TextInput from "@/components/TextInput";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState("Morning");
  return (
    <main>
      <TextInput />
      <Dropdown
        options={["Morning", "Afternoon", "Evening"]}
        onOptionSelect={(option) => setSelectedOption(option)}
        selectedOption={selectedOption}
      />
    </main>
  );
}
