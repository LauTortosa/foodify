import { useState, useEffect } from "react";

/**
 * CheckboxLoads component allows users to toggle individual and entire columns of checkboxes,
 * and persists the state to localStorage.
 *
 * @param {Array} components - List of components to be displayed.
 * @param {Number} load - Number of load columns to generate.
 * @param {String} planningId - Unique identifier for the planning, used for localStorage key.
 */

const CheckboxLoads = ({ components, load, planningId }) => {
    const [checkedLoads, setCheckedLoads] = useState({});
    const [allChecked, setAllChecked] = useState({});

    // effect to load the checked state from localStorage when the component mounts
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem(`checkedData_${planningId}`));
            if (savedData) {
            setCheckedLoads(savedData);
        }
    }, [planningId]);

    const saveToLocalStorage = (data) => {
        localStorage.setItem(`checkedData_${planningId}`, JSON.stringify(data));
    };

    const isChecked = (componentIndex, loadIndex) => {
      return checkedLoads[`${componentIndex}_${loadIndex}`] || false;
    };

    // function to toggle the checked state of a specific checkbox
    const toggleCheck = (componentIndex, loadIndex) => {
        const key = `${componentIndex}_${loadIndex}`;
        setCheckedLoads((prevState) => {
            const updatedCheckedLoads = { ...prevState, [key]: !prevState[key] };
            saveToLocalStorage(updatedCheckedLoads);
            return updatedCheckedLoads;
        });
    };

    const toggleAllChecks = (loadIndex) => {
      const newCheckedLoads = { ...checkedLoads };
      const newAllChecked = !allChecked[loadIndex];

      components.forEach((_, componentIndex) => {
          const key = `${componentIndex}_${loadIndex}`;
          newCheckedLoads[key] = newAllChecked;
      });
    
      setAllChecked((prevAllChecked) => ({ ...prevAllChecked, [loadIndex]: newAllChecked }));
      setCheckedLoads(newCheckedLoads);
      saveToLocalStorage(newCheckedLoads);
    };

    const toggleRowChecks = (componentIndex) => {
      const newCheckedLoads = { ...checkedLoads };
      const allCheckedState = Array.from({ length: load }).every((_, loadIndex) => isChecked(componentIndex, loadIndex));

      Array.from({ length: load }).forEach((_, loadIndex) => {
          const key = `${componentIndex}_${loadIndex}`;
          newCheckedLoads[key] = !allCheckedState; 
      });

      setCheckedLoads(newCheckedLoads);
      saveToLocalStorage(newCheckedLoads);
    };

    return (
  <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
    <table className="min-w-full text-sm text-left">
      <thead className="bg-gray-50 text-gray-700">
        <tr>
          <th className="p-3">🧪 Componentes</th>
          <th className="p-3">🔢 Cantidad</th>
          {Array.from({ length: load }).map((_, loadIndex) => (
            <th
              key={loadIndex}
              className="p-3 cursor-pointer hover:underline"
              onClick={() => toggleAllChecks(loadIndex)}
            >
              Carga {loadIndex + 1}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {components.map((component, componentIndex) => {
          const [ingredient, quantity] = component.split(' - ');
          return (
            <tr key={componentIndex} className="hover:bg-gray-50">
              <td
                onClick={() => toggleRowChecks(componentIndex)}
                className="p-3 cursor-pointer hover:underline"
              >
                {ingredient}
              </td>
              <td className="p-3">{quantity}</td>
              {Array.from({ length: load }).map((_, loadIndex) => (
                <td key={loadIndex} className="p-3">
                  <input
                    type="checkbox"
                    className="accent-blue-600"
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
  </div>
);


}

export default CheckboxLoads; 