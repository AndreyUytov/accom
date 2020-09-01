export {ElementsFactory, CheckboxFactory, ButtonFactory} from './elements-factory'




let index = 0

class Quest {
  readonly id:number
  private li: HTMLLIElement
  private label: HTMLLabelElement
  private checkbox: HTMLInputElement
  private checkboxMarker: HTMLSpanElement
  private textQuestion: HTMLParagraphElement
  private redactBtn: HTMLButtonElement
  private deleteBtn: HTMLButtonElement
  constructor() {
    this.id = index
    index++
    this.li = document.createElement('li')
    this.label = document.createElement('label')
    this.checkbox = document.createElement('input')
    this.checkboxMarker = document.createElement('span')
    this.textQuestion = document.createElement('p')
    this.redactBtn = document.createElement('button')
    this.deleteBtn = document.createElement('button')

    this.li.className = 'task-section__item'
    this.label.className = 'item__chekbox-label'
    this.checkbox.className = 'item__marker-checkbox visually-hidden'
    this.checkboxMarker.className = 'marker-checkbox checkbox'
    this.textQuestion.className = 'item-text'
    this.redactBtn.className = 'item-text-refactror__btn btn'
    this.deleteBtn.className = 'item-delete-task__btn btn'
  }

  get idElem () {
    return this.id
  }
}