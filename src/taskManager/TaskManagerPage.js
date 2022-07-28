import React from 'react'
import { Navbar } from './components/Navbar';

import './taskManagerPage.css';

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Column } from './components/Column';
import { TaskModal } from './components/TaskModal';

export const TaskManagerPage = () => {

    return (
        <DndProvider backend={HTML5Backend}>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <Column status='New'/>
                    <Column status='In Progress'/>
                    <Column status='Completed'/>
                </div>
            </div>
            <TaskModal/>
        </DndProvider>

    )
}
