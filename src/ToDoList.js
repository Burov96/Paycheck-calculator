import React from "react";
import Todo from "./Todo";

export default function ToDoList({todo}) {
  return (
todo.map(todo =>{ return <Todo key={todo.id}todo={todo}/>
})
  )
}
