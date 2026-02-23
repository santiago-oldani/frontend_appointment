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

    useEffect(() => {
        if (data.length === 0) {
            setHourSelected(undefined);
        }
    }, [data])

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
                            // --- TAMAÑO DESKTOP (Default) ---
                            width: "280px",
                            height: '325px',
                            overflow: "hidden",
                            margin: "0 auto",

                            // --- RESPONSIVE 1220px ---
                            '@media (max-width: 1220px)': {
                                width: '240px',
                                height: '295px',
                                // Achicamos el contenedor general de los días
                                '& .MuiDayCalendar-header, & .MuiDayCalendar-weekContainer': {
                                    gap: '0px',
                                }
                            },

                            // --- RESPONSIVE 600px ---
                            '@media (max-width: 600px)': {
                                width: '210px',
                                height: '260px',
                            },

                            // 1. Nombre del MES y AÑO
                            '& .MuiPickersCalendarHeader-label': {
                                fontSize: '1rem',
                                fontWeight: '700',
                                color: '#0047ba',
                                '@media (max-width: 1220px)': { fontSize: '0.9rem' }
                            },

                            // 2. Letras de los días: L, M, M, J...
                            '& .MuiDayCalendar-weekDayLabel': {
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                width: '40px',
                                color: '#282e3d',
                                '@media (max-width: 1220px)': {
                                    width: '32px',
                                    fontSize: '0.8rem'
                                },
                                '@media (max-width: 600px)': {
                                    width: '28px',
                                    fontSize: '0.75rem'
                                }
                            },

                            // 3. Números de los días
                            '& .MuiPickersDay-root': {
                                fontSize: '0.9rem',
                                width: '35px',
                                height: '35px',
                                fontWeight: '500',
                                '&.Mui-selected': {
                                    backgroundColor: '#0047ba !important',
                                },
                                // Ajustes por resolución para los círculos de los días
                                '@media (max-width: 1220px)': {
                                    width: '30px',
                                    height: '30px',
                                    fontSize: '0.8rem'
                                },
                                '@media (max-width: 600px)': {
                                    width: '26px',
                                    height: '26px',
                                    fontSize: '0.75rem'
                                },
                            },

                            // 4. Contenedores internos (Forzamos que se adapten al nuevo ancho)
                            '& .MuiDayCalendar-monthContainer': {
                                width: '100%',
                            },

                            '& .MuiDayCalendar-weekContainer': {
                                margin: '2px 0',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '2px',
                                '@media (max-width: 1220px)': { gap: '1px' }
                            },

                            '& .MuiDayCalendar-header': {
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '2px',
                                '@media (max-width: 1220px)': { gap: '1px' }
                            },

                            '& .MuiPickersCalendarHeader-root': {
                                paddingLeft: '16px',
                                paddingRight: '8px',
                                '@media (max-width: 1220px)': {
                                    maxHeight: '40px',
                                    minHeight: '40px',
                                    marginTop: '0px'
                                }
                            },

                            // Achicamos las flechas de navegación en móvil
                            '& .MuiPickersCalendarHeader-switchViewButton, & .MuiPickersArrowSwitcher-button': {
                                '@media (max-width: 1220px)': {
                                    padding: '4px'
                                }
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
                            <div className='bg-[#fff] w-fit text-[1.1rem] text-center p-[15px] rounded-[14px] max-[600px]:text-[0.9rem]'>No hay turnos disponibles para el dia seleccionado.</div>
                        ) : (
                            data
                                .slice()
                                .sort((a, b) => a.date.localeCompare(b.date))
                                .map((appointment) => {
                                    return (
                                        <div
                                            key={appointment.id}
                                            onClick={() => setHourSelected(appointment.id)}
                                            className={` text-[1rem] rounded-[14px] px-[16px] max-[600px]:px-[12px] max-[600px]:py-[6px] max-[600px]:text-[0.9rem] py-[8px] transition-all duration-[0.3s] cursor-pointer ${hourSelected === appointment.id ? "bg-[#0047ba] text-[#fff]" : "bg-[#fff] text-[#000]"}`}
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
                        className={`mx-auto cursor-pointer ${!hourSelected ? "opacity-[0.6] cursor-not-allowed hover:none" : "cursor-pointer hover:opacity-[0.8]"} transition-all duration-300 mt-[15px] flex max-[600px]:text-[1rem] items-center w-full justify-center bg-[#0047ba] text-[#fff] border-none rounded-[24px] text-[1.2rem] px-[24px] py-[10px]`}>
                        Agendar turno
                    </button>
                </div>

            )}
            {modalConfirm && createPortal(
                <ModalConfirmAppointment setModalConfirm={setModalConfirm} confirmAppointment={confirmAppointment} assignedAppointment={assignedAppointment} clearStatesOfAssignedAppointment={clearStatesOfAssignedAppointment} />,
                document.body
            )}
        </div>
    )
}

export default Calendar;