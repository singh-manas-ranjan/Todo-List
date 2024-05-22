import { useRef, useState } from "react";
import styles from "./Todo.module.css";
import TodoObject from "../assets/TodoObject";

interface Props {
  todos: TodoObject[];
  onAddTodo: (text: string) => void;
  onDeleteTodo: (todoId: number) => void;
  onUpdateTodo: (id: number, text: string) => void;
  zoomValue: number;
}

interface TodoChecked {
  id: number;
  checked: boolean;
}

const Todos = ({
  todos,
  onAddTodo,
  onDeleteTodo,
  onUpdateTodo,
  zoomValue,
}: Props) => {
  const [enabledId, setEnabledId] = useState(-1);
  const [searchTodo, setSearchTodo] = useState("");
  const [checkedIds, setCheckedIds] = useState<TodoChecked[]>([]);

  const todoRef = useRef<HTMLInputElement>(null);
  const updateTodoRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoRef.current === null) {
      return;
    }
    onAddTodo(todoRef.current.value);
    todoRef.current.value = "";
  };

  const handleChecked = (todoId: number) => {
    const item = checkedIds.find((todo) => todo.id === todoId);

    if (!item) {
      setCheckedIds((prevIds) => [...prevIds, { id: todoId, checked: true }]);
      return;
    }

    setCheckedIds(
      checkedIds.map((todo) =>
        todo.id === todoId ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  return (
    <div className={styles.todoContainer} style={{ scale: `${zoomValue}` }}>
      <h1>Todo List</h1>
      <form action="#" onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.addTodoGroup}>
          <input
            ref={todoRef}
            type="text"
            placeholder="Add todo..."
            className={styles.todoInput}
          />
          <button type="submit" className={styles.addTodoBtn}>
            Add Todo
          </button>
        </div>
        <input
          type="text"
          placeholder="Search todo..."
          className={styles.searchTodoInput}
          onChange={(e) => setSearchTodo(e.target.value)}
          value={searchTodo}
        />
      </form>

      <div className={styles.scrollContainer}>
        {todos
          .filter((todos) => {
            return searchTodo.trim() === ""
              ? todos
              : todos.todoText.toLowerCase().includes(searchTodo.toLowerCase());
          })
          .map((todo) => (
            <div key={todo.id} className={styles.todoItemsContainer}>
              {enabledId === todo.id ? (
                <form
                  key={todo.id}
                  action="#"
                  onSubmit={() => {
                    if (updateTodoRef.current!.value === "") {
                      updateTodoRef.current!.value = todo.todoText;
                    }
                    onUpdateTodo(todo.id, updateTodoRef.current!.value);
                    setEnabledId(-1);
                  }}
                >
                  <input
                    type="text"
                    className={styles.editTodo}
                    placeholder={todo.todoText}
                    ref={updateTodoRef}
                  />
                </form>
              ) : (
                <div key={todo.id} className={styles.todoParaContainer}>
                  {todo.todoText}
                </div>
              )}
              <div className={styles.btnGroup}>
                <button
                  className={[styles.button, styles.editBtn].join(" ")}
                  onClick={() => setEnabledId(todo.id)}
                  disabled={
                    checkedIds.find((tId) => tId.id === todo.id)?.checked
                      ? true
                      : false
                  }
                >
                  Edit
                </button>
                <button
                  className={[styles.button, styles.deleteBtn].join(" ")}
                  onClick={() => onDeleteTodo(todo.id)}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  onChange={() => handleChecked(todo.id)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Todos;
