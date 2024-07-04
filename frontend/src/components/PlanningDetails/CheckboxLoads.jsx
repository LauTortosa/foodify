import { useState, useEffect } from "react";

const CheckboxLoads = ({ components, load, planningId }) => {
    const [checkedLoads, setCheckedLoads] = useState({});

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem(`checkedData_${planningId}`));
            if (savedData) {
            setCheckedLoads(savedData);
        }
    }, [planningId]);

    const saveToLocalStorage = (data) => {
        const key = `checkedData_${planningId}`;
        localStorage.setItem(key, JSON.stringify(data));
    };
    
    const toggleCheck = (componentIndex, loadIndex) => {
        const key = `${componentIndex}_${loadIndex}`;
        setCheckedLoads((prevState) => {
            const updatedCheckedLoads = { ...prevState, [key]: !prevState[key] };
            saveToLocalStorage(updatedCheckedLoads);
            return updatedCheckedLoads;
        });
    };
    
    const isChecked = (componentIndex, loadIndex) => {
        const key = `${componentIndex}_${loadIndex}`;
        return checkedLoads[key] || false;
    };

    return (
        <table className="table">
          <thead>
            <tr>
              <th>Componentes</th>
              <th>Cantidad</th>
              {Array.from({ length: load }).map((_, loadIndex) => (
                <th key={loadIndex}>Load {loadIndex + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {components.map((component, componentIndex) => {
              const [ingredient, quantity] = component.split(' - ');
              return (
                <tr key={componentIndex}>
                  <td>{ingredient}</td>
                  <td>{quantity}</td>
                  {Array.from({ length: load }).map((_, loadIndex) => (
                    <td key={loadIndex}>
                      <input
                        className="ml-4"
                        type="checkbox"
                        id={`load_${componentIndex}_${loadIndex}`}
                        checked={isChecked(componentIndex, loadIndex)}
                        onChange={() => toggleCheck(componentIndex, loadIndex)}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
    );
    
}

export default CheckboxLoads; 