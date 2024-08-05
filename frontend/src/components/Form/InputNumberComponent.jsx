const InputNumberComponent = ({ label, value, onChange, id, className = "", register }) => {
    return (
        <div className="mt-4">
            {label && <label htmlFor={id} className="text-sm font-bold">{label}</label>}
            <input
                type="number"
                id={id}
                className={`input input-bordered input-sm w-40 max-w-xs mt-2 mb-2 ${className}`}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                {...register(id)}
            />
        </div>
    );
};

export default InputNumberComponent;