import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../models/todo";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoCard: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [edit, setEdit] = useState<string>(todo.todo);

  const handleDone = (tid: number) => {
    setTodos(
      todos.map((t) => (t.id === tid ? { ...t, isDone: !t.isDone } : t))
    );
  };
  const handleEdit = () => {
    if (editEnabled === false && todo.isDone === false) {
      setEditEnabled(true);
    }
  };
  const handleDelete = (tid: number) => {
    setTodos(todos.filter((t) => t.id !== tid));
  };
  const handleSave = (e: React.FormEvent, tid: number) => {
    e.preventDefault();
    setTodos(todos.map((t) => (t.id === tid ? { ...t, todo: edit } : t)));
    setEditEnabled(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editEnabled]);

  return (
    <form className="todo__card" onSubmit={(e) => handleSave(e, todo.id)}>
      {editEnabled ? (
        <input
          ref={inputRef}
          value={edit}
          onChange={(e) => setEdit(e.target.value)}
          className="todo__card--text"
        />
      ) : todo.isDone ? (
        <s className="todo__card--text">{todo.todo}</s>
      ) : (
        <span className="todo__card--text">{todo.todo}</span>
      )}
      <div>
        <span className="icon" onClick={() => handleEdit()}>
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default TodoCard;
