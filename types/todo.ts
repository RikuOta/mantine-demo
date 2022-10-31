export type TodoStatus = 'NOT_PROCESSING' | 'CLOSED'

export interface Todo {
  id: number,
  label: string,
  status: TodoStatus
}
