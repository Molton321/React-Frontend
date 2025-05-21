import React from "react";
import { useNavigate } from "react-router-dom";
import UniversalForm from "../../components/UniversalForm";
import * as Yup from "yup";
import MotorcycleInfringement from "../../models/motorcycleInfringement";
import motorcycleInfringementService from "../../services/motorcycleInfringementService";

const motorcycleInfringementModel: Omit<MotorcycleInfringement, "id" | "createdAt"> = {
  motorcycle_id: 0,
  infringement_id: 0,
  date: new Date(),
};

const motorcycleInfringementFormSchema = Yup.object({
  motorcycle_id: Yup.number().typeError("Debe ser un número").required("El ID de la moto es obligatorio"),
  infringement_id: Yup.number().typeError("Debe ser un número").required("El ID de la infracción es obligatorio"),
  date: Yup.date()
    .typeError("Debe ser una fecha")
    .required("La fecha es obligatoria")
    .max(new Date(), "La fecha no puede ser posterior a hoy"),
});

const CreateMotorcycleInfringementPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof motorcycleInfringementModel) => {
    try {
      await motorcycleInfringementService.createMotorcycleInfringement(values as Omit<MotorcycleInfringement, "id" | "createdAt">);
      alert("Infracción creada con éxito!");
      navigate("/motorcycleInfringement");
    } catch (error) {
      alert("Error al crear la infracción.");
    }
  };

  return (
    <div>
      <UniversalForm
        model={motorcycleInfringementModel}
        validationSchema={motorcycleInfringementFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Crear Infracción"
        formTitle="Crear Infracción"
      />
    </div>
  );
};

export default CreateMotorcycleInfringementPage;