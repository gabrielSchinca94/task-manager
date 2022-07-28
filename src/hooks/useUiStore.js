import { useDispatch, useSelector } from 'react-redux';
import { onCloseTaskModal, onOpenTaskModal } from '../store/ui/uiSlice';


export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isTaskModalOpen,
        task
    } = useSelector( state => state.ui );

    const openTaskModal = (task) => {
        dispatch( onOpenTaskModal(task) )
    }

    const closeTaskModal = () => {
        dispatch( onCloseTaskModal() )
    }

    const toggleTaskModal = () => {
        (isTaskModalOpen)
            ? openTaskModal()
            : closeTaskModal();
    }



    return {
        //* Propiedades
        isTaskModalOpen,
        task,

        //* Métodos
        closeTaskModal,
        openTaskModal,
        toggleTaskModal,
    }

}