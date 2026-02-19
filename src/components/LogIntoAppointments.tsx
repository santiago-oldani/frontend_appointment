import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAppointmentContext } from "../context/AppointmentContext";
import type { Patient } from "../utils/models";
import { IoMdArrowBack } from "react-icons/io";

const LogIntoAppointments: React.FC = () => {
    const { states, actions } = useAppointmentContext();
    const { patient } = states;
    const { setPatient } = actions;

    const [formData, setFormData] = useState({
        dni: '',
        name: '',
        lastname: ''
    });

    const [patientInStorage, setPatientInStorage] = useState<Patient | undefined>(() => {
        const saved = localStorage.getItem('current_patient');
        return saved ? JSON.parse(saved) : undefined;
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // 1. Lista de teclas de control permitidas (para que pueda borrar, saltar con tab, etc.)
        const controlKeys = [
            'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'
        ];

        // 2. Comprobamos si es un número (del 0 al 9)
        const isNumber = /^[0-9]$/.test(e.key);

        // 3. Si NO es un número Y NO es una tecla de control... BLOQUEAMOS
        if (!isNumber && !controlKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        if (errors[id]) {
            setErrors(prev => {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            });
        }

        if (id === 'dni') {
            const onlyNums = value.replace(/\D/g, '');

            setFormData(prev => ({
                ...prev,
                [id]: onlyNums
            }));

        } else {
            setFormData(prev => ({ ...prev, [id]: value }));
        }
    };

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.dni) {
            newErrors.dni = "El DNI es obligatorio";
        } else if (formData.dni.length < 7 || formData.dni.length > 8) {
            newErrors.dni = "DNI no válido (debe tener 7 u 8 números)";
        }

        if (!formData.name || formData.name.length < 3) {
            newErrors.name = "Nombre inválido (mínimo 3 letras)";
        }

        if (!formData.lastname || formData.lastname.length < 3) {
            newErrors.lastname = "Apellido inválido (mínimo 3 letras)";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const savePatient = (patient: Patient) => {
        localStorage.setItem('current_patient', JSON.stringify(patient));
    };

    const insertPatient = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await fetch('http://localhost:8081/api/patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                const data: Patient = await response.json();
                console.log(data, "DATA QUE ME TRAE EL FETCH");
                setPatient(data);
                savePatient(data);
                navigate('/appointments');
            }
            else {
                console.error("Error en el acceso");
            }
        }
        catch (error) {
            console.error("Error de red: ", error);
        }

    }

    useEffect(() => {
        if (patientInStorage) {
            setPatient(patientInStorage);
            navigate('/appointments');
        }

    }, []);

    if (patientInStorage) {
        return <div className="min-h-screen bg-white"></div>;
    }

    console.log(patient)

    return (
        /* Contenedor con el fondo gris de tu portal y centrado total */
        <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-[16px] relative">

            <div
                onClick={() => { navigate('/') }}
                className="absolute top-[10%] left-[7%] flex items-center justify-center gap-[10px] text-[#fff] rounded-[14px] transition-all duration-[0.3s] hover:bg-[#fff] hover:text-[#000] px-[10px] py-[4px] cursor-pointer">
                <IoMdArrowBack size={30} className="flex-shrink-0" />
                Volver a la página principal
            </div>

            {/* La Card con el borde superior azul grueso y sombras específicas */}
            <div className="bg-[#ffffff] w-full max-w-[450px] rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border-t-[8px] border-[#0047ba] p-[40px]">

                {/* Encabezado: Logo y Título */}
                <div className="flex flex-col items-center mb-[32px]">
                    <div className="flex items-center justify-center gap-[10px]">
                        <FaPlusCircle size={40} color="#0047ba" />
                        <h1 className="text-[#0047ba] text-[32px] font-[700] tracking-[-1px]">HealthPoint</h1>
                    </div>
                    <p className="text-[#1e335f] font-[500] mt-[8px] text-[18px]">Ingreso al portal de turnos</p>
                </div>

                <form
                    onSubmit={insertPatient}
                    className="flex flex-col gap-[24px]">
                    {/* Input DNI */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[#1e335f] text-[14px] font-[700] ml-[4px]">DNI</label>
                        <input
                            id="dni"
                            onKeyDown={handleKeyDown}
                            onChange={handleChange}
                            value={formData.dni}
                            type="number"
                            pattern="[0-9]"
                            placeholder="Ingrese su documento"
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-[90%] px-[20px] py-[16px] bg-[#f9fafb] border-[1px] border-[#e5e7eb] rounded-[16px] outline-none" />
                        {errors.dni && <span className="text-[#ff0000] text-[12px] ml-[5px]">{errors.dni}</span>}
                    </div>

                    {/* Input Nombre */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[#1e335f] text-[14px] font-[700] ml-[4px]">Nombre</label>
                        <input
                            id="name"
                            onChange={handleChange}
                            value={formData.name}
                            type="text"
                            placeholder="Su nombre"
                            className="w-[90%] px-[20px] py-[16px] bg-[#f9fafb] border-[1px] border-[#e5e7eb] rounded-[16px] outline-none focus:border-[#0047ba] transition-all duration-[300ms]"
                        />
                        {errors.name && <span className="text-[#ff0000] text-[12px] ml-[5px]">{errors.name}</span>}
                    </div>

                    {/* Input Apellido */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[#1e335f] text-[14px] font-[700] ml-[4px]">Apellido</label>
                        <input
                            id="lastname"
                            onChange={handleChange}
                            value={formData.lastname}
                            type="text"
                            placeholder="Su apellido"
                            className="w-[90%] px-[20px] py-[16px] bg-[#f9fafb] border-[1px] border-[#e5e7eb] rounded-[16px] outline-none focus:border-[#0047ba] transition-all duration-[300ms]"
                        />
                        {errors.lastname && <span className="text-[#ff0000] text-[12px] ml-[5px]">{errors.lastname}</span>}
                    </div>

                    {/* Botón de Acceso con el azul de HealthPoint */}
                    <div className="flex items-center justify-center gap-[12px]">

                        <button
                            type="submit"
                            className="w-[100%] bg-[#0047ba] text-[#ffffff] font-[700] text-[18px] py-[16px] rounded-[16px] mt-[16px] cursor-pointer hover:bg-[#1e335f] transition-colors duration-[300ms] shadow-[0_10px_20px_rgba(0,71,186,0.2)] border-none"
                        >
                            Acceder al Portal
                        </button>

                        <button
                            type="button"
                            onClick={() => setFormData({ dni: "44444444", name: "Santiago", lastname: "Oldani" })}
                            className="w-full bg-transparent cursor-pointer border-[2px] border-[#0047ba] text-[#0047ba] font-bold py-[14px] rounded-[16px] mt-[16px] hover:bg-[#f0f7ff] transition-all"
                        >
                            Cargar datos de prueba (Demo rapida)
                        </button>
                    </div>

                </form>

                <p className="text-center text-[#9ca3af] text-[12px] mt-[32px]">
                    Protección de datos garantizada por HealthPoint
                </p>
            </div>
        </div>
    )
}

export default LogIntoAppointments;