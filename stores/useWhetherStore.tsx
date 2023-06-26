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
  offset: number;
  setLocation: (location: string) => void;
  setTimeOfDay: (timeOfDay: TimeOfDay) => void;
  setDayOfWeek: (dayOfWeek: DayOfWeek) => void;
  increaseOffset: () => void;
  decreaseOffset: () => void;
}

export const useWhetherStore = create<WhetherStore>()(
  devtools(
    (set) => ({
      location: "Dolores Park",
      timeOfDay: "Afternoon",
      dayOfWeek: "Friday",
      offset: 1,
      setLocation: (location) => set(() => ({ location })),
      setTimeOfDay: (timeOfDay) => set(() => ({ timeOfDay })),
      setDayOfWeek: (dayOfWeek) => set(() => ({ dayOfWeek })),
      increaseOffset: () => set((state) => ({ offset: state.offset + 1 })),
      decreaseOffset: () => set((state) => ({ offset: state.offset - 1 })),
    }),
    {
      name: "whether-store",
    }
  )
);
