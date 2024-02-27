import React, { useState, useEffect } from 'react';
import TaskInput from './components/taskinput';
import TaskItem from './components/TaskItem';
import Stats from './components/Stats.jsx';

function App() {
    const [toDoList, setToDoList] = useState([]);
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        sortTasks();
    }, [toDoList]);

    const addTask = (taskName, dueDate) => {
        if (toDoList.some(task => task.taskName === taskName)) {
            alert('Task with the same name already exists!');
            return;
        }

        const newTask = {
            taskName,
            checked: false,
            dueDate,
            timestamp: new Date().toLocaleString()
        };
        setToDoList([...toDoList, newTask]);
    };

    function deleteTask(deleteTaskName) {
        setToDoList(toDoList.filter((task) => task.taskName !== deleteTaskName));
    }

    function toggleCheck(taskName) {
        setToDoList((prevToDoList) =>
            prevToDoList.map((task) =>
                task.taskName === taskName ? { ...task, checked: !task.checked } : task
            )
        );
    }

    const editTaskName = (oldTaskName, newTaskName) => {
        if (toDoList.some(task => task.taskName === newTaskName)) {
            alert('Task with the same name already exists!');
            return;
        }

        setToDoList((prevToDoList) =>
            prevToDoList.map((task) =>
                task.taskName === oldTaskName ? { ...task, taskName: newTaskName } : task
            )
        );
    }

    const editTaskDate = (taskName, newDueDate) => {
        setToDoList((prevToDoList) =>
            prevToDoList.map((task) =>
                task.taskName === taskName ? { ...task, dueDate: newDueDate } : task
            )
        );
    }

    const sortTasks = () => {
        setToDoList(prevToDoList =>
            [...prevToDoList].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        );
    };

    const filteredTasks = toDoList.filter((task) => {
        if (filterType === 'completed') {
            return task.checked;
        } else if (filterType === 'incomplete') {
            return !task.checked;
        } else {
            return true;
        }
    });

    return (
        <>
            <div className="container">
                <h1>To Do List</h1>

                <TaskInput addTask={addTask} />

                <div className="filters">
                    <label>
                        <input
                            type="radio"
                            value="all"
                            checked={filterType === 'all'}
                            onChange={() => setFilterType('all')}
                        />
                        All
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="completed"
                            checked={filterType === 'completed'}
                            onChange={() => setFilterType('completed')}
                        />
                        Completed
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="incomplete"
                            checked={filterType === 'incomplete'}
                            onChange={() => setFilterType('incomplete')}
                        />
                        Incomplete
                    </label>
                </div>

                <div className="toDoList">
                    <span>To Do : </span>
                    <ul className="list-items">
                        {filteredTasks.map((task, key) => (
                            <TaskItem
                                task={task}
                                key={key}
                                deleteTask={deleteTask}
                                toggleCheck={toggleCheck}
                                editTaskName={editTaskName}
                                editTaskDate={editTaskDate}
                            />
                        ))}
                    </ul>

                    {filteredTasks.length === 0 && (
                        <p className="notify">No tasks match the filter.</p>
                    )}
                </div>
            </div>

            <Stats toDoList={toDoList} />
        </>
    );
}

export default App;
