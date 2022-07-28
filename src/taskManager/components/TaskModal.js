import { useMemo, useState, useEffect } from 'react';
import Select from 'react-select';

import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useTaskManagerStore } from '../../hooks/useTaskManagerStore';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const TaskModal = () => {

    const { task, isTaskModalOpen, closeTaskModal } = useUiStore();
    const { startSavingTask } = useTaskManagerStore();
    
    const [ formSubmitted, setFormSubmitted ] = useState(false);
    
    const [formValues, setFormValues] = useState({
        description:'',
        status:'New',
    });

    const options = [
        {value:'New', label:'New'},
        {value:'In Progress', label:'In Progress'},
        {value:'Completed', label:'Completed'}
    ]
    
    const afterOpenModal = () => {

    }

    const closeModal = () => {
        closeTaskModal();
    }

    const descriptionClass = useMemo(() => {
        if ( !formSubmitted ) return '';

        return ( formValues.description.length > 0 )
            ? ''
            : 'is-invalid';

    }, [ formValues.description, formSubmitted ])

    useEffect(() => {
      if ( task !== null ) {
          setFormValues({ ...task });
      }    
      
    }, [ task ])
    


    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onSelectChanged = ({value}) => {
        setFormValues({
            ...formValues,
            status: value
        })
    }

    const onSubmit = async( event ) => {
        event.preventDefault();
        setFormSubmitted(true);
        
        if ( formValues.description.length <= 0 ) return;

        await startSavingTask( formValues );
        setFormSubmitted(false);
        closeTaskModal();
    }

  return (
    <Modal
        isOpen={isTaskModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={ customStyles }
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    >
        <h1 className="text-center"> Edit Task </h1>
        <form className="container" onSubmit={ onSubmit }>

            <hr />
            <div className="form-group mb-2">
                <label>Description: </label>
                <input 
                    type="text" 
                    className={ `form-control ${ descriptionClass }`}
                    placeholder="Task Description"
                    name="description"
                    autoComplete="off"
                    value={ formValues.description }
                    onChange={ onInputChanged }
                />
                {/* <small id="emailHelp" className="form-text text-muted">Una descripción corta</small> */}
            </div>

            <div className="form-group mb-2">
                <label>Status: </label>
                <Select 
                    options={options}
                    name="status"
                    // value={ formValues.status }
                    value={options.filter((option) => {
                        return option.value === formValues.status;
                    })}
                    onChange={ onSelectChanged }
                />
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
                onClick={onSubmit}
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}
