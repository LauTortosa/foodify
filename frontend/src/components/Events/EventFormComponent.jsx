import { useForm } from "react-hook-form";
import api from "../../api/api.jsx";

const EventFormComponent = ({ refreshEvents }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmitForm = async (data) => {
        try {
            const dataToSend = {
                event: data.event,
                date: data.date_value,
                time: data.time_value,
                location: data.location,
                endTime: parseInt(data.end_time_value)
            };

            await api.post("/event/api/", dataToSend);

            reset();
            refreshEvents();

        } catch (error) {
            console.error("Error al añadir el evento", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="p-4">
            <label className="input input-bordered flex items-center gap-2 mb-4">
                Nombre del evento
                <input type="text" {...register("event")}  className="grow"/>
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-4">
                Fecha
                <input type="date" {...register("date_value")} />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-4">
                Hora
                <input type="text" {...register("time_value")} />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-4">
                Lugar
                <input type="text" {...register("location")} />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-4">
                Duración del evento
                <input type="text" {...register("end_time_value")} />
            </label>

            <button type="submit" className="btn">Añadir evento</button>
        </form>
    );
};

export default EventFormComponent;