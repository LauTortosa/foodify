import { useEffect, useState } from "react";
import api from "../api/api.jsx";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import EventComponent from "../components/Events/EventComponent.jsx";

const EventsView = () => {
    const [events, setEvents] = useState([]);
    const username = useAuthenticatedUser();

    const getEvents = async () => {
        try {
            const response = await api.get('/event/api/list');
            setEvents(response.data);
        } catch (error) {
            console.error("Error al mostrar los eventos", error);
        }
    };

    const deleteEvent = async (eventId) => {
        try {
            await api.delete(`/event/api/${eventId}`);
            getEvents();
        } catch (error) {
            console.error("Error al eliminar el evento", error);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <EventComponent
            events={events}
            username={username}
            deleteEvent={deleteEvent}
            refreshEvents={getEvents}
        />
    );
};

export default EventsView;