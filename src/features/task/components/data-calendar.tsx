import { ResponseTask } from "@/types/task";
import {
    format,
    getDay,
    parse,
    startOfWeek,
    addMonths,
    subMonths,
} from "date-fns";
import {enUS} from "date-fns/locale";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

const locales ={
    "en-US": enUS
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface DataCalendar {
    data: ResponseTask[],
};
export const DataCalendar = ({
  data,
}: DataCalendar)=>{
    const [value,setValue]=useState(
        data.length>0 ? new Date(data[0].dueDate):new Date ()
    );
    const events = data.map((tasks)=>({
        start: new Date(tasks.dueDate),
        end: new Date(tasks.dueDate),
        title: tasks.name,
        project:tasks.project,
        assignee:tasks.assignee,
        status: tasks.status,
        id: tasks.id

    }));
    const handleNavigate = (action:"PREV"|"NEXT"|"TODAY")=>{
        if(action==="PREV"){
            setValue(subMonths(value,1))
        }
        else if(action==="NEXT"){
            setValue(addMonths(value,1))
        }
        else if(action==="TODAY"){
            setValue(new Date());
        }
    };
    return(
        <div>
           <Calendar
           localizer={localizer}
           date={value}
           events={events}
           views={["month"]}
           defaultView="month"
           toolbar
           showAllEvents
           className="h-full"
           max={new Date(new Date().setFullYear(new Date().getFullYear()+1))}
           formats={{
            weekdayFormat:(date,culture,localizer)=>localizer?.format(date,"EEE",culture)?? ""
           }}
           />
        </div>
    );
};