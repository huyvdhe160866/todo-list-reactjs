import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.type'

interface TaskInputProps {
  addTodo: (name: string) => void
  editTodo: (name: string) => void
  currentTodo: Todo | null
  finshedEditTodos: () => void
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo, editTodo, currentTodo, finshedEditTodos } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finshedEditTodos()
      if (name) {
        setName('')
      }
    } else {
      addTodo(name)
      setName('')
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (currentTodo) editTodo(value)
    else setName(value)
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>TaskInput</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput}
        />
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}
