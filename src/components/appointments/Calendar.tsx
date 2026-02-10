import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import type { Appointment } from '../../utils/models';
dayjs.locale('es');

interface getAppointmentsAvailable {
    data: Appointment[];
    getFunctionAppointments: Function;
}

const hoursArray = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"];

const Calendar: React.FC<getAppointmentsAvailable> = ({ data, getFunctionAppointments }) => {
    // Definimos el estado para la fecha seleccionada
    // Inicializamos con null o con la fecha de hoy: dayjs()
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

    // Esta es la función que faltaba:
    const handleDateChange = (nuevaFecha: Dayjs | null) => {
        setSelectedDate(nuevaFecha);

        if (nuevaFecha) {
            // Aquí podrías disparar el fetch a tu backend de Spring Boot
            // para traer los horarios disponibles de ese día específico.
            console.log("Fecha elegida para el turno:", nuevaFecha.format('YYYY-MM-DD'));
        }
    };

    useEffect(() => {
        getFunctionAppointments(selectedDate);
    }, [selectedDate])

    console.log(data, "turnos disponibles");
    return (
        <div className="flex flex-col h-full w-full items-center justify-start bg-white p-4 rounded-[20px] shadow-lg">
            <div className='bg-[#fff] rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] h-fit'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        value={selectedDate}
                        views={['day']}
                        disablePast

                        onChange={handleDateChange}
                        maxDate={dayjs().add(2, 'month')}
                        sx={{
                            // 1. Agrandamos el contenedor general
                            width: "350px",
                            height: '300px',
                            maxHeight: 'none',

                            // 2. Agrandamos los números de los días
                            '& .MuiPickersDay-root': {
                                fontSize: '1rem', // Tamaño de los números
                                width: '40px',      // Ancho del círculo de selección
                                height: '40px',     // Alto del círculo
                            },

                            // 3. Agrandamos las letras de los días (L, M, M, J...)

                            '& .MuiDayCalendar-weekDayLabel': {
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                marginRight: '6px',
                                color: '#282e3d', // El color de tu proyecto
                            },

                            // 4. Agrandamos el tamaño del nombre del mes y el año
                            '& .MuiPickersCalendarHeader-label': {
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                color: '#0047ba'
                            },

                            // Opcional: Centrar el contenido
                            '& .MuiDayCalendar-monthContainer': {
                                width: '100%',
                            }
                        }}
                    />
                </LocalizationProvider>
            </div>

            
            {selectedDate && (
                <div className='flex flex-col w-full items-start justify-center mt-[30px]'>
                    <p className='text-[#1e335f]'>Horarios disponibles: </p>
                    <div className='flex items-center justify-center gap-[10px] p-[16px] rounded-[14px] w-[350px]  flex-wrap '>

                    {data.map((appointment) => {
                        return (
                            <div className='bg-[#fff] text-[1.1rem] rounded-[14px] px-[16px] py-[8px] cursor-pointer'>{appointment.date.substring(11, 16)}</div>
                        )
                    })}
                </div>
                </div>
                
            )}
        </div>
    )
}

export default Calendar;