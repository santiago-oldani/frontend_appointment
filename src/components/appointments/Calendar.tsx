import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import type { Appointment } from '../../utils/models';
import ModalConfirmAppointment from '../modals/ModalConfirmAppointment';
import { createPortal } from 'react-dom';
import 'dayjs/locale/es';
dayjs.locale('es');

interface getAppointmentsAvailable {
    data: Appointment[];
    getAppointmentsAvailable: Function;
    confirmAppointment: Function;
    selectAppointment: Function;
    assignedAppointment: Appointment | undefined;
    clearStatesOfAssignedAppointment: Function;
}

const Calendar: React.FC<getAppointmentsAvailable> = ({ data, getAppointmentsAvailable, confirmAppointment, selectAppointment, assignedAppointment, clearStatesOfAssignedAppointment }) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [hourSelected, setHourSelected] = useState<number>();
    const [modalConfirm, setModalConfirm] = useState<boolean>(false);

    const handleDateChange = (nuevaFecha: Dayjs | null) => {
        setSelectedDate(nuevaFecha);

        if (nuevaFecha) {
            console.log("Fecha elegida para el turno:", nuevaFecha.format('YYYY-MM-DD'));
        }
    };

    useEffect(() => {
        if (data && data.length > 0) {
            const sortedData = [...data].sort((a, b) => a.date.localeCompare(b.date));
            setHourSelected(sortedData[0].id);
        }
    }, [data]);

    useEffect(() => {
        getAppointmentsAvailable(selectedDate);
    }, [selectedDate])

    useEffect(() =>{
        if(data.length === 0){
            setHourSelected(undefined);
        }
    }, [data])

    console.log(assignedAppointment, "turnos disponibles");

    console.log(hourSelected);
    return (
        <div className="flex flex-col h-full w-full items-center justify-start bg-white p-4 rounded-[20px] shadow-lg">
            <div className='bg-[#fff] rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] h-fit'>
                <LocalizationProvider adapterLocale='es' dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        value={selectedDate}
                        views={['day']}
                        disablePast
                        onChange={handleDateChange}
                        maxDate={dayjs().add(45, 'days')}
                        sx={{
                            width: "280px",
                            height: '295px',
                            overflow: "hidden",
                            margin: "0 auto",

                            // 1. Nombre del MES y AÑO (Más grandes)
                            '& .MuiPickersCalendarHeader-label': {
                                fontSize: '1rem', // Subimos de 1rem a 1.2rem
                                fontWeight: '700',
                                color: '#0047ba'
                            },

                            // 2. Letras de los días: L, M, M, J... (Más grandes)
                            '& .MuiDayCalendar-weekDayLabel': {
                                fontSize: '0.9rem', // Subimos a 1rem (tamaño estándar de lectura)
                                fontWeight: '600',
                                width: '40px',    // Aumentamos el área para que no se pisen
                                color: '#282e3d',
                            },

                            // 3. Números de los días (Más grandes y legibles)
                            '& .MuiPickersDay-root': {
                                fontSize: '0.9rem', // Antes era 0.85rem
                                width: '35px',
                                height: '35px',
                                fontWeight: '500',
                                // Efecto al seleccionar
                                '&.Mui-selected': {
                                    backgroundColor: '#0047ba !important',
                                }
                            },

                            // 4. Ajustes de espaciado interno para que los 40px entren en los 300px
                            '& .MuiDayCalendar-monthContainer': {
                                width: '100%',
                            },

                            '& .MuiDayCalendar-weekContainer': {
                                margin: '2px 0',
                                display: 'flex',
                                justifyContent: 'center',
                                // Reducimos el espacio entre días para que entren los números grandes
                                gap: '2px',
                            },

                            // Centrado de la cabecera de días
                            '& .MuiDayCalendar-header': {
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '2px',
                            },

                            // Ajuste de las flechas de navegación
                            '& .MuiPickersCalendarHeader-root': {
                                paddingLeft: '16px',
                                paddingRight: '8px',
                            }
                        }}
                    />
                </LocalizationProvider>
            </div>


            {selectedDate && (
                <div className='flex flex-col w-full items-start justify-center mt-[10px]'>
                    <p className='text-[#1e335f]'>Horarios disponibles: </p>
                    <div className='flex items-center justify-center gap-[10px] mt-[20px] rounded-[14px] w-full h-full flex-wrap '>
                        {data.length === 0 ? (
                            <div className='bg-[#fff] w-fit text-[1.1rem] text-center p-[15px] rounded-[14px]'>No hay turnos disponibles para el dia seleccionado.</div>
                        ) : (
                            data
                                .slice()
                                .sort((a, b) => a.date.localeCompare(b.date))
                                .map((appointment) => {
                                    return (
                                        <div
                                            key={appointment.id}
                                            onClick={() => setHourSelected(appointment.id)}
                                            className={` text-[1rem] rounded-[14px] px-[16px] py-[8px] transition-all duration-[0.3s] cursor-pointer ${hourSelected === appointment.id ? "bg-[#0047ba] text-[#fff]" : "bg-[#fff] text-[#000]"}`}
                                        >
                                            {appointment.date.substring(11, 16)}
                                        </div>
                                    )
                                })
                        )}
                    </div>
                    <button
                    disabled={!hourSelected}
                        onClick={() => {
                            setModalConfirm(true);
                            selectAppointment(hourSelected);
                        }}
                        className={`mx-auto cursor-pointer ${!hourSelected ? "opacity-[0.6] cursor-not-allowed hover:none" : "cursor-pointer hover:opacity-[0.8]"} transition-all duration-300 mt-[15px] flex  items-center w-full justify-center bg-[#0047ba] text-[#fff] border-none rounded-[24px] text-[1.2rem] px-[24px] py-[10px]`}>
                        Agendar turno
                    </button>
                </div>

            )}
            {modalConfirm && createPortal(
                <ModalConfirmAppointment setModalConfirm={setModalConfirm} confirmAppointment={confirmAppointment} assignedAppointment={assignedAppointment} clearStatesOfAssignedAppointment={clearStatesOfAssignedAppointment}/>,
                document.body
            )}
        </div>
    )
}

export default Calendar;