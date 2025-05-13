import { useEffect, useState } from "react";
import axios from "axios";

const EventsComponent = () => {
    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/event/api/list');
            console.log("response", response.data);
            setEvents(response.data);
        } catch (error) {
            console.error("Error al mostrar los eventos", error);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div className="p-4">
            <div className="grid grid-cols-2">
                <h2 className="text-xl font-bold underline mb-4 text-gray-800">Próximos Eventos</h2>
                <div>
                <p className=""><span className="text-sm ml-2 mr-2">✚</span>Añadir evento</p>

                </div>

            </div>
            <ul className="space-y-3">
                {events.map((event) => (
                <li
                    key={event.id}
                    className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow text-sm text-gray-600 mr-16"
                >
                    <h3 className="text-gray-800 font-medium text-base mb-2 flex justify-between items-center">
                        <span>{event.event}</span>
                        <button className="btn btn-square btn-xs">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                            </svg>
                        </button>
                    </h3>

                    <p><span className="font-medium">📅 Día:</span> {event.date_value}</p>
                    <p><span className="font-medium">⏰ Hora:</span> {event.time_value}</p>
                    <p><span className="font-medium">📍 Lugar:</span> {event.location}</p>
                    <p><span className="font-medium">⏳ Duración:</span> {event.end_time_value}</p>
                </li>
                ))}
            </ul>
</div>

    );
};

export default EventsComponent;