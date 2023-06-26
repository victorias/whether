import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const TimeOfDayOptions = ["Morning", "Afternoon", "Evening"] as const;
export const DayOfWeekOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type TimeOfDay = (typeof TimeOfDayOptions)[number];
type DayOfWeek = (typeof DayOfWeekOptions)[number];

interface WhetherStore {
  location: string;
  timeOfDay: TimeOfDay;
  dayOfWeek: DayOfWeek;
  setLocation: (location: string) => void;
  setTimeOfDay: (timeOfDay: TimeOfDay) => void;
  setDayOfWeek: (dayOfWeek: DayOfWeek) => void;
}

export const useWhetherStore = create<WhetherStore>()(
  devtools(
    (set) => ({
      location: "Dolores Park",
      timeOfDay: "Afternoon",
      dayOfWeek: "Friday",
      setLocation: (location) => set((state) => ({ location })),
      setTimeOfDay: (timeOfDay) => set((state) => ({ timeOfDay })),
      setDayOfWeek: (dayOfWeek) => set(() => ({ dayOfWeek })),
    }),
    {
      name: "whether-store",
    }
  )
);
