import React from "react";
import { Todo } from "../models/todo";
import "./styles.css";
import TodoCard from "./TodoCard";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  const content: JSX.Element[] = todos.map((t) => (
    <TodoCard todo={t} todos={todos} setTodos={setTodos} />
  ));
  return <div className="todos">{content}</div>;
};

export default TodoList;
