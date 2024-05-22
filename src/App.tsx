import { useEffect, useState } from "react";
import Todos from "./components/Todos";
import "./App.css";
import TodoObject from "./assets/TodoObject";
import ZoomController from "./components/ZoomController";
import Calendar from "./components/Calendar";

const App = () => {
  const getTodoFromLocalHost = () => {
    const data = localStorage.getItem("todos");
    if (data !== null) {
      return JSON.parse(data) as TodoObject[];
    }
    return [];
  };
  const [todos, setTodos] = useState<TodoObject[]>(getTodoFromLocalHost());

  const onAddTodo = (todo: string) => {
    setTodos((prev) => [...prev, { id: prev.length + 1, todoText: todo }]);
  };

  const onDeleteTodo = (todoId: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const onUpdateTodo = (todoId: number, newTodo: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, todoText: newTodo } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [zoom, setZoom] = useState<number>(1);
  const onZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.01);
  };
  const onZoomOut = () => {
    setZoom((prevZoom) => prevZoom - 0.01);
  };

  return (
    <div className="app">
      <ZoomController handleZoomIn={onZoomIn} handleZoomOut={onZoomOut} />
      <Calendar />
      <Todos
        todos={todos}
        onAddTodo={onAddTodo}
        onDeleteTodo={onDeleteTodo}
        onUpdateTodo={onUpdateTodo}
        zoomValue={zoom}
      />
    </div>
  );
};

export default App;
