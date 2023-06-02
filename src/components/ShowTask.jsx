import React from 'react';
function ShowTask({ taskList, setTaskList, handleDone, handleEdit, handleDelete, clearDoneTask }) {
    return (
        <section className="showTask">
            <p className="head">
                <span>
                    <span className="title">Todo</span>
                    <span className="count">{taskList.length}</span>
                </span>
                <span className="clearDone" onClick={() =>{  if (window.confirm('Are you sure, you wish to delete all done tasks?')) clearDoneTask()} }>Clear Done</span>
                <span className="clearAll" onClick={() => {if (window.confirm('Are you sure, you wish to delete all tasks?'))setTaskList([])} }>Clear All</span>
            </p>
            <ul>
                {taskList.map((task) => (
                    <li className={`${task.taskDone? 'done': ''}`} key={task.id}>
                        <p>
                            <span className="name">{task.name}</span>
                            <span className="time">{task.time}</span>
                        </p>
                        <i className={`bi bi-bookmark-check${task.taskDone? '-fill': ''}`} onClick={() => handleDone(task.id)}></i>
                        {/* <i class="bi bi-bookmark-check-fill"></i> */}
                        <i className="bi bi-pencil-square" onClick={() => handleEdit(task.id)}></i>
                        <i className="bi bi-trash" onClick={() => handleDelete(task.id)}></i>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ShowTask;