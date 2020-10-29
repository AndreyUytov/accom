import { addTaskAction, GUIFactory } from './../types'

export default class TaskSectionCreator {
  private section: HTMLElement
  private wrapper: HTMLElement
  private label: HTMLElement
  private input: HTMLInputElement
  constructor(addTaskAction: addTaskAction, factory: GUIFactory) {
    this.section = factory.taskCreatorSection
    this.wrapper = factory.taskCreatorSectionWrapper
    this.label = factory.taskCreatorSectionLabel
    this.input = factory.taskCreatorSectionInput
    this.onTaskCreatorBtnClick(addTaskAction)
    this.build()
  }

  private build() {
    this.input.placeholder = 'Add new task'
    this.label.dataset.tooltip = 'press Enter'

    this.label.append(this.input)
    this.wrapper.append(this.label)
    this.section.append(this.wrapper)
  }

  private onTaskCreatorBtnClick(cb: (taskValue: string) => any) {
    const addNewTask = () => {
      if (this.input.value.trim()) {
        cb(this.input.value.trim())
      }
      this.input.value = ''
    }
    this.input.onkeydown = (evt) => (evt.keyCode === 13 ? addNewTask() : null)

    let timerId: ReturnType<typeof setTimeout>
    const timerTooltip = (searchInput: HTMLInputElement) => {
      return setTimeout(() => {
        searchInput.value.trim()
          ? this.label.classList.add('show')
          : this.label.classList.remove('show')
      }, 500)
    }
    this.input.addEventListener('input', (evt) => {
      let searchInput = evt.currentTarget as HTMLInputElement
      if (timerId) {
        clearTimeout(timerId)
        this.label.classList.remove('show')
        timerId = timerTooltip(searchInput)
      } else {
        timerId = timerTooltip(searchInput)
      }
    })
  }

  get elem() {
    return this.section
  }
}
