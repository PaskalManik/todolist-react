import React, { useState } from 'react';
import { MdDeleteSweep, MdEdit } from 'react-icons/md';

const TaskItem = ({ task, deleteTask, toggleCheck, editTaskName, editTaskDate }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedTaskName, setEditedTaskName] = useState(task.taskName);
    const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        editTaskName(task.taskName, editedTaskName);
        editTaskDate(task.taskName, editedDueDate); 
        setEditMode(false);
    };
    

    const handleChangeName = (e) => {
        setEditedTaskName(e.target.value);
    };

    const handleChangeDate = (e) => {
        setEditedDueDate(e.target.value);
    };

    return (
        <li className='items'>
            {!editMode ? (
                <div className='items-text'>
                    <input
                        type="checkbox"
                        checked={task.checked}
                        onChange={() => toggleCheck(task.taskName)}
                    />
                    <p className={task.checked ? 'isChecked' : ''}>{task.taskName}</p>
                    <p>{task.dueDate}</p> {}
                </div>
            ) : (
                <div className='items-text'>
                    <input type="text" value={editedTaskName} onChange={handleChangeName} />
                    <input type="date" value={editedDueDate} onChange={handleChangeDate} /> {}
                </div>
            )}
            <div>
                {!editMode ? (
                    <MdEdit className='edit-icon' onClick={handleEdit} />
                ) : (
                    <button className='save-button' onClick={handleSave}>Save</button>
                )}
                {!editMode && (
                    <MdDeleteSweep
                        className='delete-icon'
                        onClick={() => deleteTask(task.taskName)}
                    />
                )}
            </div>
        </li>
    );
};

export default TaskItem;
