import {
  TaskInterface,
  CheckBoxAction,
  RedactAction,
  RemoveAction,
  GUIFactory,
} from './../types'

export default class Task {
  readonly id: number
  private li: HTMLElement
  private label: HTMLElement
  private checkbox: HTMLInputElement
  private checkboxMarker: HTMLElement
  private textQuestion: HTMLElement
  private redactBtn: HTMLButtonElement
  private deleteBtn: HTMLButtonElement
  private modalInput: HTMLInputElement
  constructor(
    { isDone, taskId, taskValue }: TaskInterface,
    CheckBoxAction: CheckBoxAction,
    RedactAction: RedactAction,
    RemoveAction: RemoveAction,
    changeCheckBox: (evt: any) => any,
    factory: GUIFactory
  ) {
    this.id = taskId
    this.li = factory.taskItem
    this.li.onclick = changeCheckBox
    this.label = factory.taskLabel
    this.checkbox = factory.taskCheckBox
    this.checkbox.checked = isDone
    this.checkboxMarker = factory.taskCheckBoxMarker
    this.textQuestion = factory.taskValue
    this.textQuestion.textContent = `${taskValue}`
    this.redactBtn = factory.taskRedactBtn
    this.deleteBtn = factory.taskDeleteBtn
    this.modalInput = factory.taskModalInput
    this.onDeleteBtnClick(RemoveAction)
    this.onCheckboxChange(CheckBoxAction)
    this.onRedactBtnClick(RedactAction)
    this.build()
  }

  private refactorTask(cb: (id: number, newValue: string) => any, task: Task) {
    task.textQuestion.textContent = task.modalInput.value.trim()
    cb(task.id, task.textQuestion.textContent)
    task.modalInput.remove()
  }

  private renderModalInput(cb: (id: number, newValue: string) => any) {
    this.modalInput.value = this.textQuestion.textContent

    this.modalInput.onkeydown = (evt) => {
      evt.code === 'Enter' ? this.refactorTask(cb, this) : null
    }
    this.modalInput.onblur = () => this.refactorTask(cb, this)
    this.modalInput.onclick = () => this.refactorTask(cb, this)
    this.li.append(this.modalInput)
    this.modalInput.focus()
  }

  private onDeleteBtnClick(cb: (id: number) => any) {
    this.deleteBtn.onclick = () => {
      cb(this.id)
      this.elem.remove()
    }
  }

  private onRedactBtnClick(cb: (id: number, newValue: string) => any) {
    this.redactBtn.onclick = () => this.renderModalInput(cb)
  }

  private onCheckboxChange(cb: (id: number, isChecked: boolean) => any) {
    this.checkbox.onchange = () => cb(this.id, this.checkbox.checked)
  }

  private build() {
    this.label.append(this.checkbox, this.checkboxMarker, this.textQuestion)
    this.li.append(this.label, this.redactBtn, this.deleteBtn)
  }

  public update({ isDone, taskValue }: TaskInterface) {
    if (isDone !== this.checkbox.checked) {
      this.checkbox.checked = isDone
    } else if (taskValue !== this.textQuestion.textContent) {
      this.textQuestion.textContent = taskValue
    }
  }

  get elem() {
    return this.li
  }
}
