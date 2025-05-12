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
            <h2 className="text-xl font-bold underline mb-4 text-gray-800">Próximos Eventos</h2>
            <ul className="space-y-3">
                {events.map((event) => (
                <li
                    key={event.id}
                    className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow text-sm text-gray-600 mr-16"
                >
                    <h3 className="text-gray-800 font-medium text-base mb-2">{event.event}</h3>
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