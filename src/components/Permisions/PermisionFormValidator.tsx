import { Permision } from "../../models/Permision";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


// Definimos la interfaz para los props
interface MyFormProps { //Es como el contructor de la clase
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Permision) => void; //Permite inyectar una funcion, (funcion lambda)
    handleUpdate?: (values: Permision) => void;
    permision?: Permision | null; //null para crear, User para actualizar
}



const PermisionFormValidator: React.FC<MyFormProps> = ({ mode, handleCreate, handleUpdate,permision }) => {

    const handleSubmit = (formattedValues: Permision) => {
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
            initialValues={permision ? permision :{
                method: "",
                description: ""
            }}
            validationSchema={Yup.object({
                method: Yup.string().required("El método es obligatorio"),
                url: Yup.string().required("La url es obligatoria"),
            })}
            onSubmit={(values) => {
                const formattedValues = { ...values};  // Formateo adicional si es necesario
                handleSubmit(formattedValues);
            }}
            
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* Método */}
                    <div>
                        <label htmlFor="method" className="block text-lg font-medium text-gray-700">Método</label>
                        <Field type="text" name="method" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="method" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Url */}
                    <div>
                        <label htmlFor="url" className="block text-lg font-medium text-gray-700">Url</label>
                        <Field type="text" name="url" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="url" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Botón de enviar */}
                    <button
                        type="submit"
                        className={`py-2 px-4 text-white rounded-md ${mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {mode === 1 ? "Crear" : "Actualizar"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default PermisionFormValidator;