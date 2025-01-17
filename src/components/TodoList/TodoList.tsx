import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])

  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const doneTodo = todos.filter((todo) => todo.done)
  const notDoneTodo = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObject: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todosObject)
  }, [])

  const addTodo = (name: string) => {
    const handler = (todosObject: Todo[]) => {
      return [...todosObject, todo]
    }
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos(handler)
    const todosString = localStorage.getItem('todos')
    const todosObject: Todo[] = JSON.parse(todosString || '[]')
    const newTodos = handler(todosObject)
    localStorage.setItem('todos', JSON.stringify(newTodos))
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

  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return {
          ...prev,
          name
        }
      }
      return prev
    })
  }

  const finshedEditTodos = () => {
    const handler = (todosObject: Todo[]) => {
      return todosObject.map((todo) => {
        if (todo.id === currentTodo?.id) {
          return currentTodo
        }
        return todo
      })
    }

    setTodos(handler)
    setCurrentTodo(null)
    const todosString = localStorage.getItem('todos')
    const todosObject: Todo[] = JSON.parse(todosString || '[]')
    const newTodos = handler(todosObject)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => {
      const todoIndex = prev.findIndex((todo) => todo.id === id)
      if (todoIndex > -1) {
        const result = [...prev]
        result.splice(todoIndex, 1)
        if (currentTodo?.id === id) {
          setCurrentTodo(null)
        }
        return result
      }
      return prev
    })
  }

  return (
    <div className={styles.toDoList}>
      <div className={styles.toDoListContainer}>
        <TaskInput
          addTodo={addTodo}
          editTodo={editTodo}
          currentTodo={currentTodo}
          finshedEditTodos={finshedEditTodos}
        />
        <TaskList
          todos={notDoneTodo}
          handleDoneTodo={handleDoneTodo}
          getEditTodo={getEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodo}
          handleDoneTodo={handleDoneTodo}
          getEditTodo={getEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}
