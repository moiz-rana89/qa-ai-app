"use client";

import React, { useEffect, useState, useContext } from "react";
import { format } from "date-fns";
import date_icon from "../../../assets/date-icon.svg";
import { cn } from "../../../components/lib/utils.tsx";
import { useLocation } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/Calendar/popover.tsx";
import { ChevronUp } from "lucide-react";
import { TableStore } from "../../../components/Calendar/tablestore.tsx";
import AppContext from "../../../context/AppContext";
import { Calendar } from "../../../components/Calendar/Calendar.tsx";

const getLast15DaysLARange = () => {
  const now = new Date();
  // Convert to LA timezone
  const laTime = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const endDate = new Date(laTime);
  const startDate = new Date(laTime);
  startDate.setDate(laTime.getDate() - 14); // subtract 14 days to get last 15 days
  return {
    from: startDate,
    to: endDate,
  };
};

export function AttendanceDateRange({ className, setStartDate, setEndDate }) {
  const {
    setStartingDateFilter,
    setEndingDateFilter,
    startingDateFilter,
    endingDateFilter,
    setIsDateOpen,
    isDateOpen,
    ClearTrigger,
  } = useContext(AppContext);

  // const DefaultDateRange: DateRange = {
  //   from: new Date(2025, 3, 17), // April 17, 2025 (months are 0-based)
  //   to: new Date(2025, 4, 1),    // May 1, 2025
  // };

  const { resetAllPageCounter } = TableStore();

  const [date, setDate] = useState(null);
  const [isPreset, setIsPreset] = useState(false);

  // Initialize date states with LA timezone last 15 days
  //   useEffect(() => {
  //     const defaultRange = getLast15DaysLARange();
  //     setDate(defaultRange);
  //     handleDateSelect(defaultRange);
  //   }, []);

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      console.log("selectedDate", selectedDate);
      setDate(selectedDate);
      if (selectedDate.from) {
        setStartingDateFilter(format(selectedDate.from, "yyyy-MM-dd"));
        setStartDate(format(selectedDate.from, "yyyy-MM-dd"));
      }
      if (selectedDate.to) {
        setEndingDateFilter(format(selectedDate.to, "yyyy-MM-dd"));
        setEndDate(format(selectedDate.to, "yyyy-MM-dd"));
      }
    }
  };

  const clearDate = () => {
    setDate(undefined);
    setStartingDateFilter("");
    setEndingDateFilter("");
    setStartDate(null);
    setEndDate(null);
  };

  const location = useLocation().pathname;

  useEffect(() => {
    clearDate();
  }, [ClearTrigger]);

  //   useEffect(() => {
  //     console.log("nkdnf");
  //     if (date) {
  //       console.log("selectedDate", date);
  //       setDate(date);
  //       if (date.from) {
  //         setStartingDateFilter(format(date.from, "yyyy-MM-dd"));
  //       }
  //       if (date.to) {
  //         setEndingDateFilter(format(date.to, "yyyy-MM-dd"));
  //       }
  //     }
  //     // setDate(DefaultDateRange);
  //     // setStartingDateFilter("2025-04-17");
  //     // setEndingDateFilter("2025-05-01");
  //   }, [location]);

  const handleThisMonthPreSet = () => {
    const today = new Date(); // Get the current date
    const firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const dateRange = {
      from: firstDate,
      to: lastDate,
    };

    handleDateSelect(dateRange);
    setIsPreset(true);
  };

  const handleLastMonthPreSet = () => {
    const today = new Date(); // Get the current date
    const firstDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDate = new Date(today.getFullYear(), today.getMonth(), 0);

    const dateRange = {
      from: firstDate,
      to: lastDate,
    };

    setDate(dateRange);
    handleDateSelect(dateRange);
    setIsPreset(true);
  };

  const handleLast30DaysPreSet = () => {
    const today = new Date();
    const endOfWeek = new Date(today);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - 30); // Subtract 6 days to get the start of the week

    const dateRange = {
      from: startOfWeek,
      to: endOfWeek,
    };
    handleDateSelect(dateRange);
    setIsPreset(true);
  };

  const handleLast7DaysPreSet = () => {
    const today = new Date();
    const endOfWeek = new Date(today);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - 6); // Subtract 6 days to get the start of the week

    const dateRange = {
      from: startOfWeek,
      to: endOfWeek,
    };
    handleDateSelect(dateRange);
    setIsPreset(true);
  };

  const handleMonthChange = () => {
    setIsPreset(false);
  };

  return (
    <div className={cn("grid gap-2")}>
      <Popover
        onOpenChange={() => {
          setIsDateOpen(!isDateOpen);
        }}
      >
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn(
              "  flex items-center border bg-[#FBFBFB] space-x-1 px-2  text-left font-normal rounded-full duration-300 transition-all ",
              className,
              !date
            )}
          >
            <div className=" pl-[5px] flex items-center text-xs text-black pt-[1px] ">
              <img className="mr-2 h-4 w-4" src={date_icon} alt="" />

              {date?.from ? (
                date.to ? (
                  <>
                    <span className="text-xs">
                      {format(date.from, "MM/dd/yy")}
                    </span>{" "}
                    -
                    <span className="text-xs">
                      {format(date.to, "MM/dd/yy")}
                    </span>
                  </>
                ) : (
                  format(date.from, "dd/MM/yy")
                )
              ) : (
                <span className="text-sm">Pick a Date</span>
              )}
            </div>
            {isDateOpen ? (
              <ChevronUp
                className="duration-500 rotate-0 mt-[1.5px] "
                color="black"
              />
            ) : (
              <ChevronUp
                className="duration-500 rotate-180 mt-[1.5px] "
                color="black"
              />
            )}
          </button>
        </PopoverTrigger>
        {isDateOpen && (
          <PopoverContent
            className="w-auto border-0 p-0 flex justify-items-end rounded-xl"
            align="center"
          >
            <Calendar
              className="border-r-2 w-[345px] flex items-center  justify-center"
              captionLayout="dropdown-buttons"
              fromYear={2015}
              toYear={2025}
              mode="range"
              month={isPreset ? date?.from : undefined}
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateSelect}
              onMonthChange={handleMonthChange}
              numberOfMonths={1}
            />
            <div className="flex flex-col justify-between p-4 bg-white border-2 border-gray-200">
              <div className="grid grid-cols-2 gap-[15px]">
                <button
                  onClick={clearDate}
                  className={cn(
                    "text-sm py-2 px-4 rounded-full text-center font-normal border bg-white text-main-text text-black"
                  )}
                >
                  All Time
                </button>
                <button
                  onClick={handleLast7DaysPreSet}
                  className={cn(
                    "text-sm  py-2 px-4 rounded-full text-center font-normal border bg-white text-main-text text-black"
                  )}
                >
                  Last 7 Days
                </button>
                <button
                  onClick={handleLast30DaysPreSet}
                  className={cn(
                    "text-sm  py-2 px-4 rounded-full text-center font-normal border bg-white text-main-text text-black"
                  )}
                >
                  Last 30 Days
                </button>
                <button
                  onClick={handleThisMonthPreSet}
                  className={cn(
                    "text-sm  py-2 px-4 rounded-full text-center font-normal border bg-white text-main-text text-black"
                  )}
                >
                  This Month
                </button>
                <button
                  onClick={handleLastMonthPreSet}
                  className={cn(
                    "text-sm  py-2 px-4 rounded-full text-center font-normal border bg-white text-main-text text-black"
                  )}
                >
                  Last Month
                </button>
                <button
                  className={cn(
                    "text-sm  py-2 px-4 rounded-full text-center font-normal border bg-white text-main-text text-black"
                  )}
                >
                  Custom
                </button>
              </div>
              <div className="flex space-x-2 justify-between">
                <button
                  onClick={() => {
                    resetAllPageCounter();
                    clearDate();
                  }}
                  className={cn(
                    "text-sm py-2 px-4 w-full rounded-full text-center font-normal border bg-white text-main-text text-black"
                  )}
                >
                  Clear
                </button>
              </div>
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
