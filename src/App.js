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
    console.log('taskList = ', taskList);
    console.log('task = ', task);

    const date = new Date();
    if (editid) {
      const selectedTask = taskList.find(task => task.id === editid);
      const updateTask = taskList.map((e) => (e.id === selectedTask.id ? (e = { id: e.id, name: task, time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}` }) : { id: e.id, name: e.name, time: e.time }))
      setTaskList(updateTask);
      setEditid(0);
      setTask("");
      return;
    }

    if (task) {
      setTaskList([...taskList, { id: date.getTime(), name: task, time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}` }])

    }
  }
  useEffect(() => {
    console.log('Theme changes button clicked..', theme)
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);
  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));

  })
  const handleEdit = (id) => {
    const selectedTask = taskList.find(task => task.id === id);
    setTask(selectedTask);
    setTaskList(id);
  }
  const handleDelete = (id) => {
    const updatedTaskList = taskList.filter((task) => task.id !== id)
  }
  return (
    <div className={"App " + theme}>
      <div className="container">
        <Header setTheme={setTheme} theme={theme}
        >Task Manager </Header>
        <AddTask handleSubmit={handleSubmit} editid={editid} task={task} setTask={setTask}></AddTask>
        <ShowTask taskList={taskList} setTaskList={setTaskList} handleEdit={handleEdit} handleDelete={handleDelete}></ShowTask>
      </div>
    </div>
  )
}
export default App;