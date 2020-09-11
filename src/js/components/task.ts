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
    this.onDeleteBtnClick(RemoveAction)
    this.onCheckboxChange(CheckBoxAction)
    this.onRedactBtnClick(RedactAction)
    this.build()
  }

  private createModalInput (cb: (id: number, newValue: string) => any) {
    const modalInput: HTMLInputElement = new StandartInputCreator().elem
    modalInput.type = 'text'
    modalInput.className = 'item__modal-input'
    modalInput.value = this.textQuestion.textContent

    const refactorTask = () => {
      this.textQuestion.textContent = modalInput.value.trim()
      cb(this.id, this.textQuestion.textContent)
      modalInput.remove()
    }

    modalInput.onkeydown = (evt) => evt.keyCode === 13 ? refactorTask() : null
    modalInput.onblur = refactorTask
    this.li.append(modalInput)
    modalInput.focus()
  }

  private onDeleteBtnClick (cb: (id: number) => any) {
    this.deleteBtn.onclick = () => {cb(this.id); this.elem.remove()}
  }

  private onRedactBtnClick (cb: (id: number, newValue: string) => any) {
    this.redactBtn.onclick = () => this.createModalInput(cb)
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