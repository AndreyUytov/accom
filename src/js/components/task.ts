import {StandartLiCreator,
        StandartCheckBoxMarkerCreator,
        StandartTaskTextCreator,
        StandartRedactButtonCreator,
        StandartDeleteButtonCreator,
        StandartInputCreator,
        StandartCheckboxCreator,
        StandartLabelCreator 
} from './../utility/standart-elements-creators'
import {TaskInterface} from './../types'

export default class Task {
  readonly id:number
  private li: HTMLElement
  private label: HTMLElement
  private checkbox: HTMLInputElement
  private checkboxMarker: HTMLElement
  private textQuestion: HTMLElement
  private redactBtn: HTMLButtonElement
  private deleteBtn: HTMLButtonElement
  constructor({isDone, taskId, taskValue}: TaskInterface) {
    this.id = taskId
    this.li = new StandartLiCreator().elem
    this.label = new StandartLabelCreator().elem
    this.checkbox = new StandartCheckboxCreator(isDone).elem
    this.checkboxMarker = new StandartCheckBoxMarkerCreator().elem
    this.textQuestion = new StandartTaskTextCreator(taskValue).elem
    this.redactBtn = new StandartRedactButtonCreator().elem
    this.deleteBtn = new StandartDeleteButtonCreator().elem
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

  onDeleteBtnClick (cb: (id: number) => any) {
    this.deleteBtn.onclick = () => cb(this.id)
  }

  onRedactBtnClick (cb: (id: number, newValue: string) => any) {
    this.redactBtn.onclick = () => this.createModalInput(cb)
  }

  onCheckboxChange (cb: (id: number, isChecked: boolean) => any) {
    this.checkbox.onchange = () => cb(this.id, this.checkbox.checked)
  }

  private build () {
    this.label.append(this.checkbox, this.checkboxMarker, this.textQuestion)
    this.li.append(this.label, this.redactBtn, this.deleteBtn)
  }

  get elem () {
    return this.li
  }
}