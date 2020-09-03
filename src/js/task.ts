import {StandartLiCreator,
        StandartCheckBoxMarkerCreator,
        StandartTaskTextCreator,
        StandartRedactButtonCreator,
        StandartDeleteButtonCreator,
        StandartInputCreator,
        StandartCheckboxCreator,
        StandartLabelCreator } from './standart-elements-creators'

let id = 0
export default class Task {
  readonly id:number
  private li: HTMLElement
  private label: HTMLElement
  private checkbox: HTMLInputElement
  private checkboxMarker: HTMLElement
  private textQuestion: HTMLElement
  private redactBtn: HTMLButtonElement
  private deleteBtn: HTMLButtonElement
  constructor(task: string) {
    this.id = id
    id++
    this.li = new StandartLiCreator().elem
    this.label = new StandartLabelCreator().elem
    this.checkbox = new StandartCheckboxCreator().elem
    this.checkboxMarker = new StandartCheckBoxMarkerCreator().elem
    this.textQuestion = new StandartTaskTextCreator(task).elem
    this.redactBtn = new StandartRedactButtonCreator().elem
    this.deleteBtn = new StandartDeleteButtonCreator().elem
  }

  private createModalInput (cb: (id: number, taskText: string) => any) {
    const modalInput: HTMLInputElement = new StandartInputCreator().elem
    modalInput.type = 'text'
    modalInput.className = 'item__modal-input'
    modalInput.value = this.textQuestion.textContent

    const refactorTask = () => {
      this.textQuestion.textContent = modalInput.value.trim()
      cb(this.id, modalInput.value)
      modalInput.remove()
    }

    modalInput.onkeydown = (evt) => evt.keyCode === 13 ? refactorTask () : null
    modalInput.onblur = refactorTask
    this.li.append(modalInput)
    modalInput.focus()
  }

  addDeleteListener (cb: (id: number) => any) {
    this.deleteBtn.onclick = () => cb(this.id)
  }

  addRedactorListener (cb: (id: number, taskText: string) => any) {
    this.redactBtn.onclick = () => this.createModalInput(cb)
  }

  addCheckboxListener (cb: (id: number, isChecked: boolean) => any) {
    this.checkbox.onchange = () => cb(this.id, this.checkbox.checked)
  }

  private build () {
    this.label.append(this.checkbox, this.checkboxMarker, this.textQuestion)
    this.li.append(this.label, this.redactBtn, this.deleteBtn)
  }

  get taskItem () {
    this.build()
    return this.li
  }
}