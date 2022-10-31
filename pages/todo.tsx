import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react'
import { ActionIcon, Badge, Button, Checkbox, Kbd, Modal, Table, Tabs, TextInput, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconPlus, IconTrash } from '@tabler/icons'
import { useTodo } from 'hooks/useTodo'
import { Todo as ITodo } from 'types/todo'

export default function Todo() {
  const theme = useMantineTheme()
  const form = useForm({
    initialValues: {
      todoLabel: '',
      searchText: ''
    }
  })

  const {
    data,
    addTodo,
    updateTodoStatus,
    deleteTodo
  } = useTodo()

  // 全て
  const [allTodos, setAllTodos] = useState<ITodo[]>([])
  useEffect(() => {
    if (!data) return
    setAllTodos(data)
  }, [data])

  // 未対応
  const [notProcessingTodos, setNotProcessingTodos] = useState<ITodo[]>([])
  useEffect(() => {
    setNotProcessingTodos(allTodos.filter(todo => todo.status === 'NOT_PROCESSING'))
  }, [allTodos])

  // 完了
  const [closedTodos, setClosedTodos] = useState<ITodo[]>([])
  useEffect(() => {
    setClosedTodos(allTodos.filter(todo => todo.status === 'CLOSED'))
  }, [allTodos])

  // モーダル
  const [modalOpened, setModalOpened] = useState(false)
  const openModal = () => {
    setModalOpened(true)
  }

  const closeModal = () => {
    setModalOpened(false)
    // モーダルが閉じられてから (ユーザの目に見えないときに) 入力を空にする
    setTimeout(() => {
      form.setFieldValue('todoLabel', '')
    }, 300)
  }

  const _addTodo = async () => {
    const todoLabel = form.getInputProps('todoLabel').value
    await addTodo(todoLabel)
    closeModal()
  }

  const addTodoWithKeyboard = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.metaKey) {
      await _addTodo()
    }
  }

  // タブ
  interface Tab {
    id: string,
    label: string,
    todos: ITodo[]
  }

  const tabs: Tab[] = [
    { id: '1', label: '全て', todos: allTodos },
    { id: '2', label: '未対応', todos: notProcessingTodos },
    { id: '3', label: '完了', todos: closedTodos }
  ]

  return (
    <>
      <Button
        size="lg"
        radius={100}
        onClick={openModal}
        className="!w-[44px] !h-[44px] p-0 mb-4"
      >
        <IconPlus size={24} />
      </Button>

      <Tabs defaultValue={tabs[0].id} variant="default">
        <Tabs.List>
          {tabs.map(tab =>
            <Tabs.Tab
              value={tab.id}
              key={tab.id}
              className="pt-5 pb-3 sm:py-3"
              rightSection={
                <Badge
                  sx={{ width: 18, height: 18, pointerEvents: 'none' }}
                  variant="filled"
                  size="xs"
                  p={0}
                >
                  {tab.todos.length}
                </Badge>
              }
            >
              {tab.label}
            </Tabs.Tab>
          )}
        </Tabs.List>

        {tabs.map(tab =>
          <Tabs.Panel value={tab.id} key={tab.id}>
            <Table
              horizontalSpacing={16}
              verticalSpacing={10}
              highlightOnHover
              striped
              className="table-auto"
            >
              <tbody>
              {tab.todos.map((todo) =>
                <tr key={todo.id} onClick={() => updateTodoStatus(todo)} className="cursor-pointer">
                  <td>
                    <div className="flex justify-between items-center gap-6 w-full">
                      <div className="flex items-center flex-nowrap gap-2">
                        <Checkbox
                          checked={todo.status === 'CLOSED'}
                          label={todo.label}
                          onChange={() => updateTodoStatus(todo)}
                          className="flex"
                        />
                      </div>

                      <ActionIcon color="red" onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation()
                        deleteTodo(todo)
                      }}>
                        <IconTrash size={16} />
                      </ActionIcon>
                    </div>
                  </td>
                </tr>
              )}
              </tbody>
            </Table>
          </Tabs.Panel>
        )}
      </Tabs>

      <Modal
        opened={modalOpened}
        title="Add Todo"
        overlayColor={theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        onClose={closeModal}
      >
        <TextInput
          placeholder="Todo"
          data-autofocus
          size="md"
          rightSectionWidth={90}
          rightSection={<Kbd>⌘ + enter</Kbd>}
          {...form.getInputProps('todoLabel')}
          onKeyDown={addTodoWithKeyboard}
          className="mb-5"
        />

        <Button
          disabled={form.getInputProps('todoLabel').value.length <= 0}
          className="px-7 mr-4"
          onClick={_addTodo}
        >
          Add
        </Button>

        <Button
          variant="default"
          onClick={closeModal}
        >
          Cancel
        </Button>
      </Modal>
    </>
  )
}
