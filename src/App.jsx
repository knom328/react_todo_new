import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleateTodo } from "./components/IncompleateTodo";
import { CompleateTodo } from "./components/CompleateTodo";

export const App = () => {
  // 入力したTODO
  const [todoText, setTodoText] = useState("");
  // 未完了のTODOリスト
  const [incompleateTodos, setIncompleateTodos] = useState([]);
  // 完了のTODOリスト
  const [compleateTodos, setCompleateTodos] = useState([]);

  // 入力したい値をtodoTextに設定
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタンのevent
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleateTodos, todoText];
    setIncompleateTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleateTodos];
    newTodos.splice(index, 1);
    setIncompleateTodos(newTodos);
  };
  const onClickCompleate = (index) => {
    // 未完了Listから削除
    const newIncompleateTodos = [...incompleateTodos];
    newIncompleateTodos.splice(index, 1);
    // 完了Listへ追加
    const newCompleateTodos = [...compleateTodos, incompleateTodos[index]];
    // set
    setIncompleateTodos(newIncompleateTodos);
    setCompleateTodos(newCompleateTodos);
  };

  const onClickBack = (index) => {
    // 完了Listから削除
    const newCompleateTodos = [...compleateTodos];
    newCompleateTodos.splice(index, 1);
    // 未完了Listへ追加
    const newIncompleateTodos = [...incompleateTodos, compleateTodos[index]];
    // set
    setCompleateTodos(newCompleateTodos);
    setIncompleateTodos(newIncompleateTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleateTodos.length >= 5}
      />

      {incompleateTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTODOの上限は5個です</p>
      )}

      <IncompleateTodo
        todos={incompleateTodos}
        onClickCompleate={onClickCompleate}
        onClickDelete={onClickDelete}
      />

      <CompleateTodo todos={compleateTodos} onClickBack={onClickBack} />
    </>
  );
};
