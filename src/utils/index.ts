import type {Appointment} from "./models";

function formatDate(appointment: Appointment): { fecha: string, hora: string } {
        const date = new Date(appointment.date);

        const formattedDate = date.toLocaleDateString("es-AR", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "2-digit"
        });

        const formattedTime = date.toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

        return { fecha: formattedDate, hora: formattedTime };
}

export{
    formatDate
}