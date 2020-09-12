import {StandartLiCreator,
        StandartCheckBoxMarkerCreator,
        StandartTaskTextCreator,
        StandartRedactButtonCreator,
        StandartDeleteButtonCreator,
        StandartInputCreator,
        StandartCheckboxCreator,
        StandartLabelCreator 
} from './../utility/standart-elements-creators'
import {
  TaskInterface,
  CheckBoxAction,
  RedactAction,
  RemoveAction
} from './../types'

export default class Task {
  readonly id:number
  private li: HTMLElement
  private label: HTMLElement
  private checkbox: HTMLInputElement
  private checkboxMarker: HTMLElement
  private textQuestion: HTMLElement
  private redactBtn: HTMLButtonElement
  private deleteBtn: HTMLButtonElement
  private modalInput: HTMLInputElement
  constructor({isDone, taskId, taskValue}: TaskInterface,
     CheckBoxAction: CheckBoxAction,
     RedactAction: RedactAction,
     RemoveAction: RemoveAction, changeCheckBox: (evt:any) => any) {
    this.id = taskId
    this.li = new StandartLiCreator().elem
    this.li.onclick = changeCheckBox
    this.label = new StandartLabelCreator().elem
    this.checkbox = new StandartCheckboxCreator(isDone).elem
    this.checkboxMarker = new StandartCheckBoxMarkerCreator().elem
    this.textQuestion = new StandartTaskTextCreator(taskValue).elem
    this.redactBtn = new StandartRedactButtonCreator().elem
    this.deleteBtn = new StandartDeleteButtonCreator().elem
    this.modalInput = new StandartInputCreator('item__modal-input').elem 
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

  private renderModalInput (cb: (id: number, newValue: string) => any) {
    
    this.modalInput.value = this.textQuestion.textContent

    this.modalInput.onkeydown = (evt) => evt.keyCode === 13 ? this.refactorTask(cb, this) : null
    this.modalInput.onblur = () => this.refactorTask(cb, this)
    this.modalInput.onclick = () => this.refactorTask(cb, this)
    this.li.append(this.modalInput)
    this.modalInput.focus()
  }

  private onDeleteBtnClick (cb: (id: number) => any) {
    this.deleteBtn.onclick = () => {cb(this.id); this.elem.remove()}
  }

  private onRedactBtnClick (cb: (id: number, newValue: string) => any) {
    this.redactBtn.onclick = () => this.renderModalInput(cb)
  }

  private onCheckboxChange (cb: (id: number, isChecked: boolean) => any) {
    this.checkbox.onchange = () => cb(this.id, this.checkbox.checked)
  }

  private build () {
    this.label.append(this.checkbox, this.checkboxMarker, this.textQuestion)
    this.li.append(this.label, this.redactBtn, this.deleteBtn)
  }

  public update({isDone, taskValue}: TaskInterface) {
    if (isDone !== this.checkbox.checked) {
      this.checkbox.checked = isDone
      console.log('update from Task Component', isDone)
    }else if(taskValue !== this.textQuestion.textContent) {
      this.textQuestion.textContent = taskValue
    }
  }

  get elem () {
    return this.li
  }
}