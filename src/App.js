import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import ShowTask from "./components/ShowTask";


function App() {
  const [task, setTask] = useState("");
  const [editid, setEditid] = useState(0)
  const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem("taskList")) || []);
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || "medium");

  const handleSubmit = (event) => {
    event.preventDefault();

    const date = new Date();
    if (editid) {
      const selectedTask = taskList.find(task => task.id === editid);
      const updateTask = taskList.map((e) => (e.id === selectedTask.id ?
        (e = { id: e.id, name: task, time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}` }) :
        { id: e.id, name: e.name, time: e.time, taskDone: e.taskDone }));

      setTaskList(updateTask);
      setEditid(0);
      setTask("");
      return;
    }

    if (task) {
      setTaskList([...taskList, {
        id: date.getTime(), name: task, time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
        taskDone: false
      }])
      setTask("");
    }
  }
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);
  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList])
  const handleEdit = (id) => {
    const selectedTask = taskList.find(task => task.id === id);
    setTask(selectedTask.name);
    setEditid(id);
  }
  const handleDelete = (id) => {
    const updatedTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(updatedTaskList);
  }
  const handleDone = (id) => {
    const doneTask = taskList.filter((task) => task.id === id);
    doneTask[0].taskDone = doneTask[0].taskDone ? false : true;
    const notUpdatedTaskList = taskList.filter((task) => task.id !== id);
    const notDoneTaskList = [...notUpdatedTaskList,...doneTask].filter(task => task.taskDone === false);
    const doneTaskList = [...notUpdatedTaskList,...doneTask].filter(task => task.taskDone === true);
    setTaskList([...notDoneTaskList,...doneTaskList]);
  }
  return (
    <div className={"App " + theme}>
      <div className="container">
        <Header setTheme={setTheme} theme={theme}
        >Task Manager </Header>
        <AddTask handleSubmit={handleSubmit} editid={editid} task={task} setTask={setTask}></AddTask>
        <ShowTask taskList={taskList} setTaskList={setTaskList} handleDone={handleDone} handleEdit={handleEdit} handleDelete={handleDelete}></ShowTask>
      </div>
    </div>
  )
}
export default App;