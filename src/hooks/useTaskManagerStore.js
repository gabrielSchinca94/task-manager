import { useDispatch, useSelector } from 'react-redux';
import { setActiveTask, addNewTask, editTask, deleteTask } from '../store/task/taskSlice';


export const useTaskManagerStore = () => {
  
    const dispatch = useDispatch();
    const { tasks, active } = useSelector( state => state.task );

    const startSetActiveTask = ( task ) => {
        dispatch( setActiveTask( task ) );
    }

    const startSavingTask = async( task ) => {

        // Todo bien
        if( task.uid ) {
            // Actualizando
            dispatch( editTask({ ...task }) );
        } else {
            // Creando
            dispatch( addNewTask( { ...task }) );
        }
    }

    const startDeletingTask = ( task ) => {

        dispatch( deleteTask( { ...task } ) );

    }


    return {
        //* Propiedades
        active,
        tasks,

        //* Métodos
        startDeletingTask,
        startSavingTask,
        startSetActiveTask,
    }
}
