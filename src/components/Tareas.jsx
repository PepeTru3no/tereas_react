import React, { useState } from 'react'
import { tareasIniciales } from '../TareasIniciales';

const Tareas = () => {

    const [listaTareas, setListaTareas]= useState(tareasIniciales);
    const [nuevaTarea, setNuevaTarea]=useState('');

    const enviarFormulario=(e)=>{
        e.preventDefault();
        if(!nuevaTarea.trim()){
            alert("campo Vacio")
            return
        }else if(listaTareas.findIndex(el=> el.nombre === nuevaTarea)>0){
            alert('la tarea ya existe')
            setNuevaTarea('');
            return
        }
        setListaTareas([...listaTareas,{nombre:nuevaTarea, completada:false}]);
        setNuevaTarea('');
    }

    const capturaInput=(e)=>{
        setNuevaTarea(e.target.value);
    }

    const completarTarea=(tarea)=>{
        const nuevasTareas=[...listaTareas];
        const index= nuevasTareas.findIndex(el => el.nombre === tarea.nombre);
        nuevasTareas[index].completada = true;
        setListaTareas(nuevasTareas);
    }

    const eliminarTarea=(tarea)=>{
        const listaFiltrada= listaTareas.filter(el=>el.nombre!==tarea.nombre);
        setListaTareas(listaFiltrada);
    }

    return (
        <>
            <form onSubmit={enviarFormulario}> 
                <input type="text" name="nuevaTarea" onChange={capturaInput} value={nuevaTarea} />
                <button type="submit">Agregar tarea</button>
            </form>
    
            <ul>
                {listaTareas.map((tarea)=>
                    <li key={tarea.nombre} style={(tarea.completada)?{textDecoration:'line-through'}:{}}> 
                        {tarea.nombre}
                        {(!tarea.completada)?<button type="button" onClick={()=>completarTarea(tarea)}>Completar</button>:''}
                        <button type="button" onClick={()=>eliminarTarea(tarea)}> Borrar</button>
                        
                    </li>
                )}
            </ul>
        </>
    )
}

export default Tareas