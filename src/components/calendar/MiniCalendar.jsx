import React, { useState } from "react";
import Calendar from "react-calendar";
import Card from "components/card";
import "react-calendar/dist/Calendar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "assets/css/MiniCalendar.css";

const MiniCalendar = ({ title, handleTakeOff, handleArrival, type }) => {
  const [value, onChange] = useState(new Date());
  const t = type ? type : ""
  
  if(t === "tdate"){
    handleTakeOff(value)
  }
  if(t === "rdate"){
    handleArrival(value)
  }

  return (
    <div>
      <h1 class="block font-sans text-3xl font-semibold leading-tight tracking-normal text-green-500 antialiased dark:text-white">
        {title && title}
      </h1>
      <Card extra="flex w-full h-full flex-col px-3 py-3">
        <Calendar
          onChange={onChange}
          value={value}
          prevLabel={<MdChevronLeft className="ml-1 h-6 w-6 " />}
          nextLabel={<MdChevronRight className="ml-1 h-6 w-6 " />}
          view={"month"}
        />
      </Card>
    </div>
  );
};

export default MiniCalendar;
