import { useState, useEffect, useRef } from "react";
import "./DataPicker.css";

function DatePicker({ onDateChange }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState("");
  const calendarRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  // Función para manejar la selección de la fecha
  const handleDateSelect = (newDate) => {
    setDate(newDate);
    onDateChange(newDate); // Llamamos al callback para actualizar la fecha en el formulario
    setShowCalendar(false); // Cerramos el calendario
  };

  // Función para generar el calendario de este mes
  const generateCalendar = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    // Establecer el primer día del mes
    // const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const calendarDays = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i);
      calendarDays.push(day);
    }

    return calendarDays;
  };

  return (
    <div>
      <label htmlFor="fecha">Selecciona una fecha:</label>
      <div className="datepicker-container">
        <input
          type="text"
          readOnly
          ref={inputRef}
          value={date}
          onClick={() => setShowCalendar(!showCalendar)}
          onChange={(e) => setDate(e.target.value)} // Si deseas editar manualmente la fecha
          placeholder="Selecciona una fecha"
          className="datepicker-input"
        />

        {showCalendar && (
          <div ref={calendarRef} className="calendar">
            <div className="calendar-body">
              {generateCalendar().map((day, index) => (
                <button
                  key={index}
                  className="calendar-day"
                  onClick={() => handleDateSelect(day.toLocaleDateString())}
                >
                  {day.getDate()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DatePicker;
