const InputRadioComponent = ({ name, options, selectedValue, onChange }) => {
    return (
        <div>
            {options.map(option => (
                <div key={option.value} className="mb-2">
                    <label htmlFor={option.id} className="mr-3">{option.label}</label>
                    <input 
                        type="radio" 
                        name={name}
                        className="radio radio-xs"
                        id={option.id}
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={() => onChange(option.value)}
                    />
                </div>
            ))}
        </div>
    )

};

export default InputRadioComponent;