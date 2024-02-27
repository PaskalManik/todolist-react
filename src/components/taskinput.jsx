// taskinput.jsx
import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');

    function handleTaskInput(event) {
        setTask(event.target.value);
    }

    function handleDueDateInput(event) {
        setDueDate(event.target.value);
    }

    function handleAddTask(event) {
        event.preventDefault();
        if (task.trim() === '' || dueDate.trim() === '') return;
        addTask(task, dueDate);
        setTask('');
        setDueDate('');
    }

    return (
        <form className='inputField' onSubmit={handleAddTask}>
            <input type="text" value={task} placeholder='Add Item' onChange={handleTaskInput} />
            <input type="date" value={dueDate} onChange={handleDueDateInput} />
            <button>+</button>
        </form>
    );
};

export default TaskInput;
