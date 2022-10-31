import { useEffect, useState } from 'react'
import { Todo, TodoStatus } from 'types/todo'
import { notifyAdded, notifyDeleted } from 'utilities/notify'

export const useTodo = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([])
  useEffect(() => {
    setAllTodos([
      { id: 1, label: '設計', status: 'NOT_PROCESSING' },
      { id: 2, label: '実装', status: 'NOT_PROCESSING' },
      { id: 3, label: 'コードレビュー', status: 'NOT_PROCESSING' },
      { id: 4, label: 'テスト', status: 'NOT_PROCESSING' },
      { id: 5, label: '勉強', status: 'NOT_PROCESSING' }
    ])
  }, [])

  const addTodo = async (todoName: string) => {
    const maxId = Math.max(...allTodos.map(todo => todo.id))
    const newTodo: Todo = {
      id: maxId + 1,
      label: todoName,
      status: 'NOT_PROCESSING'
    }
    notifyAdded(todoName)
    setAllTodos([newTodo, ...allTodos])
  }

  const updateTodoStatus = async (todo: Todo) => {
    let newStatus: TodoStatus
    switch (todo.status) {
      case 'NOT_PROCESSING':
        newStatus = 'CLOSED'
        break
      case 'CLOSED':
        newStatus = 'NOT_PROCESSING'
        break
    }

    const copiedAllTodos = [...allTodos]
    const targetTodoIndex = copiedAllTodos.findIndex(_todo => _todo.id === todo.id)
    const newTodo = { ...todo, status: newStatus }
    copiedAllTodos.splice(targetTodoIndex, 1, newTodo)
    setAllTodos(copiedAllTodos)
  }

  const deleteTodo = async (todo: Todo) => {
    const copiedAllTodos = [...allTodos]
    setAllTodos(
      copiedAllTodos.filter(_todo => _todo.id !== todo.id)
    )
    notifyDeleted(todo.label)
  }

  return {
    data: allTodos,
    addTodo,
    updateTodoStatus,
    deleteTodo
  }
}
