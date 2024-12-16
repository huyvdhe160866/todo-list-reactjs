import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])

  const doneTodo = todos.filter((todo) => todo.done)
  const notDoneTodo = todos.filter((todo) => !todo.done)

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done
          }
        }
        return todo
      })
    )
  }

  console.log(todos)
  return (
    <div className={styles.toDoList}>
      <div className={styles.toDoListContainer}>
        <TaskInput addTodo={addTodo} />
        <TaskList todos={notDoneTodo} handleDoneTodo={handleDoneTodo} />
        <TaskList doneTaskList todos={doneTodo} handleDoneTodo={handleDoneTodo} />
      </div>
    </div>
  )
}
