import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getDate = () => {
  const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const today = new Date();
  const month = MONTH[today.getMonth()];
  const year = today.getFullYear();
  const date = today.getDate();
  const day = DAY[today.getDay()];

  return { day, month, year, date };
};

export const randomCount = (count: number) => Math.floor(Math.random() * count) + 1;
