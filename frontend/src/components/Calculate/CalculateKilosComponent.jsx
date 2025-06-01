import { useState } from "react";
import AlertComponent from "../AlertComponent";

const CalculateKilosComponent = ({
  selectedProducts,
  load,
  setCalculatedKilosTotal,
  calculatedKilosTotal,
  getProductComponents
}) => {
  const [warningMessage, setWarningMessage] = useState("");

  const calculateTotal = async () => {
    if (selectedProducts.length === 0) {
      setWarningMessage("Debe seleccionar al menos un producto");
      return;
    }
    if (load <= 0) {
      setWarningMessage("La carga tiene que ser mayor que 0");
      return;
    }

    setWarningMessage("");

    const newCalculatedKilos = { ...calculatedKilosTotal };

    for (const productId of selectedProducts) {
      const components = await getProductComponents(productId);
      components.forEach((component) => {
        const [name, kilos] = component.split(" = ");
        const parsedKilos = parseFloat(kilos);
        const additionalKilos = parseFloat((parsedKilos * load).toFixed(2));

        if (!newCalculatedKilos[name]) newCalculatedKilos[name] = 0;
        newCalculatedKilos[name] += additionalKilos;
      });
    }

    setCalculatedKilosTotal(newCalculatedKilos);
  };

  return (
    <div>
      <button onClick={calculateTotal} className="btn btn-sm mb-4 w-40">
        Calcular
      </button>
      {warningMessage && (
        <AlertComponent
          type="warning"
          message={warningMessage}
          onClose={() => setWarningMessage("")}
        />
      )}
    </div>
  );
};

export default CalculateKilosComponent;
