import React, { useEffect } from 'react'

const Demo: React.FC = () => {

    //reduccion, mapeo y filtrado, funciones lambda
    //Las funciones lamda son funciones anonimas que se pueden pasar como argumentos a otras funciones
    //Las funciones flecha son funciones anonimas que se pueden pasar como argumentos a otras funciones

    let [name, setName] = React.useState<string>('Mundo'); //renderización
    let colores = ['rojo', 'verde', 'azul'];
    let flag = true;
    const manejarCambio = (event:any) => {
        setName(event.target.value);
    }

    useEffect(() => {
        //Llamada al back, aqui llamamos a los servicios
    }, []);
  return (
    <div>
      <h1>Hola {name}</h1>

      <input type="text" value={name} onChange={manejarCambio} />
        <ul>
            {flag? /* Condicional */
            <li>Verdadero</li>   :  /* else */
            <li>Falso</li>}
            {colores.map((color, index) => {
            return <li key={index}>{color}</li>
            })}
        </ul>
    </div>
  )
}

export default Demo;