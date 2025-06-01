const InputNumberComponent = ({ 
    label, 
    value, 
    onChange, 
    id, 
    className = "",
    register, 
}) => {
    
    const inputElement = (
        <input
            type="text"
            id={id}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            {...(register ? register(id) : {})}
            className={`grow ${className}`}
        />
    );

    return (
        <label className={`input input-bordered flex items-center gap-2 mb-4 ${className}`}>
            {label}
            {inputElement}
        </label>
    );
};

export default InputNumberComponent;

