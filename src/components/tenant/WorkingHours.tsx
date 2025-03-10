import { useState } from "react";

const WeekSchedule = () => {
  const [schedule, setSchedule] = useState<Record<string, { open: string; close: string; isClosed: boolean }>>({
    Monday: { open: "09:00", close: "18:00", isClosed: false },
    Tuesday: { open: "09:00", close: "18:00", isClosed: false },
    Wednesday: { open: "09:00", close: "18:00", isClosed: false },
    Thursday: { open: "09:00", close: "18:00", isClosed: false },
    Friday: { open: "09:00", close: "18:00", isClosed: false },
    Saturday: { open: "09:00", close: "16:00", isClosed: false },
    Sunday: { open: "10:00", close: "16:00", isClosed: true }
  });

  const handleChange = (day: string, type: "open" | "close", value: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value,
        close: type === "open" && value > prev[day].close ? value : prev[day].close
      }
    }));
  };

  const toggleClosed = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], isClosed: !prev[day].isClosed }
    }));
  };

  return (
    <div className="max-w-full p-2 mb-3 bg-white shadow-md rounded-xl border border-gray-200">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-gray-800">⏰ Рабочие часы</h2>
      <div className="space-y-4">
        {Object.entries(schedule).map(([day, { open, close, isClosed }]) => (
          <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
            <span className="w-24 font-semibold text-gray-700">{day}</span>
            
            <label className="flex items-center gap-2 cursor-pointer mt-2 sm:mt-0">
              <input
                type="checkbox"
                checked={isClosed}
                onChange={() => toggleClosed(day)}
                className="hidden"
              />
              <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${isClosed ? "bg-red-500" : "bg-green-500"}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${isClosed ? "translate-x-5" : ""}`}></div>
              </div>
              <span className="text-gray-600">{isClosed ? "Выходной" : "Рабочий"}</span>
            </label>
            
            {!isClosed && (
              <div className="flex gap-2 mt-2 sm:mt-0">
                <input
                  type="time"
                  value={open}
                  step="900"
                  onChange={(e) => handleChange(day, "open", e.target.value)}
                  className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm w-full sm:w-auto"
                />
                <span className="text-gray-500">—</span>
                <input
                  type="time"
                  value={close}
                  step="900"
                  min={open}
                  onChange={(e) => handleChange(day, "close", e.target.value)}
                  className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm w-full sm:w-auto"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekSchedule;
