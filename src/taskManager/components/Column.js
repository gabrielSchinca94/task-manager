import React from 'react';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import { useTaskManagerStore } from '../../hooks/useTaskManagerStore';
import { TaskItem } from './TaskItem';

import './column.css';

export const Column = ({status}) => {

    const { tasks } = useSelector( state => state.task );

    const filtered = tasks.filter(task => task.status === status);

    const { startSavingTask } = useTaskManagerStore();

    const [{isOver}, drop] = useDrop(() => ({
        accept: 'task',
        drop: (task) => {
            task.status = status;
            startSavingTask(task);
        },
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
    }), [])

    const color = (status === 'New') ? 'bg-danger' : (status === 'In Progress') ? 'bg-warning' : 'bg-success';

    const handleNewTask = () => {
        const task = {
            description:'',
            status
        }

        startSavingTask(task);
    }

    return (
        <div className="col-md-4 column" ref={drop} style={{position: 'relative'}}>
            <div>
                <h3 className="column-header">{status} 
                    <button 
                        className="btn btn-sm btn-success"
                        onClick={handleNewTask}
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </h3>
            </div>
            {
                filtered.map( task => (
                    <TaskItem key={ task.uid } {...task} />
                ))
            }
            {isOver && (
                <div className={color}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        opacity: 0.5
                    }}
                />
            )}
        </div>
    )
}
