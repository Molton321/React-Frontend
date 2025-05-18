import { Role } from "../../models/Role";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


// Definimos la interfaz para los props
interface MyFormProps { //Es como el contructor de la clase
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Role) => void; //Permite inyectar una funcion, (funcion lambda)
    handleUpdate?: (values: Role) => void;
    role?: Role | null; //null para crear, User para actualizar
}



const RoleFormValidator: React.FC<MyFormProps> = ({ mode, handleCreate, handleUpdate,role }) => {

    const handleSubmit = (formattedValues: Role) => {
        if (mode === 1 && handleCreate) {
            handleCreate(formattedValues);  // Si `handleCreate` está definido, lo llamamos
        } else if (mode === 2 && handleUpdate) {
            handleUpdate(formattedValues);  // Si `handleUpdate` está definido, lo llamamos
        } else {
            console.error('No function provided for the current mode');
        }
    };
    //Formik permite que se valide mediante se vaya escribiendo, y no hasta que se envie el formulario
    return (
        <Formik
            initialValues={role ? role :{
                name: "",
                description: ""
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("El nombre es obligatorio"),
                description: Yup.string().required("La descripción es obligatoria"),
            })}
            onSubmit={(values) => {
                const formattedValues = { ...values};  // Formateo adicional si es necesario
                handleSubmit(formattedValues);
            }}
            
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nombre</label>
                        <Field type="text" name="name" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Descripcion */}
                    <div>
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700">Descripción</label>
                        <Field type="text" name="description" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Botón de enviar */}
                    <button
                        type="submit"
                        className={`py-2 px-4 text-black rounded-md ${mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {mode === 1 ? "Crear" : "Actualizar"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default RoleFormValidator;