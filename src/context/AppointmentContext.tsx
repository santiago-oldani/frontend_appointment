import React, { createContext, useContext } from 'react';
import { useAppointments } from '../hooks/useAppointments';

type AppointmentContextType = ReturnType<typeof useAppointments>;

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const appointmentData = useAppointments();

    return (
        <AppointmentContext.Provider value={appointmentData}>
            {children}
        </AppointmentContext.Provider>
    );
};

export const useAppointmentContext = () => {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error("useAppointmentContext debe usarse dentro de un AppointmentProvider");
    }
    return context;
};