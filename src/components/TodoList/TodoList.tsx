import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])

  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

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

  const getEditTodo = (id: string) => {
    const todo = todos.find((todo) => todo.id === id)
    if (todo) setCurrentTodo(todo)    
  }

  const editTodo = (name: string) =>{
    setCurrentTodo(prev => {
      if (prev) {
        return {
          ...prev,
          name
        }
      }
      return prev
    })
  }

  const finshedEditTodos = () =>{
    setTodos(prev => {
      return prev.map(todo => {
        if (todo.id === currentTodo?.id) {
          return currentTodo
        }
        return todo
      })
    })
    setCurrentTodo(null)
  }

  console.log(currentTodo)
  return (
    <div className={styles.toDoList}>
      <div className={styles.toDoListContainer}>
        <TaskInput addTodo={addTodo} editTodo={editTodo} currentTodo={currentTodo} finshedEditTodos={finshedEditTodos}/>
        <TaskList todos={notDoneTodo} handleDoneTodo={handleDoneTodo} getEditTodo={getEditTodo}/>
        <TaskList doneTaskList todos={doneTodo} handleDoneTodo={handleDoneTodo} getEditTodo={getEditTodo} />
      </div>
    </div>
  )
}
