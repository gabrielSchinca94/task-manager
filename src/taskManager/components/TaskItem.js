import React from 'react';
import { useDrag } from 'react-dnd';
import { useTaskManagerStore } from '../../hooks/useTaskManagerStore';
import { useUiStore } from '../../hooks/useUiStore';

import './taskItem.css';

export const TaskItem = (task) => {

    const { startDeletingTask } = useTaskManagerStore();

    const { openTaskModal } = useUiStore();

    const [{isDragging}, drag] = useDrag(() => ({
        type: 'task',
        item:{...task},
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
    }))

    const handleDeleteTask = () => {
        startDeletingTask(task);
    }
    const handleEditTask = () => {
        console.log({task, page:'TaskItem'})
        openTaskModal(task);
    }

  return (
    <div className="task-item-container card m-3" ref={drag} style={{opacity: isDragging ? 0.5 : 1, cursor: 'move'}}>
        <div className="task-item-header">
            <div><span className="bold">Status: </span>{task.status}</div>
            <div>
                <button 
                    className="btn btn-outline-success py-0 px-2 mx-1"
                    onClick={handleEditTask}
                >
                    <i className="fas fa-pen"></i>
                </button>
                <button 
                    className="btn btn-outline-danger py-0 px-2 mx-1"
                    onClick={handleDeleteTask}
                >
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div className="task-item-body">
            <div>{task.description}</div>
        </div>
    </div>
  )
}
