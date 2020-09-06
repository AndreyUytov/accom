import {
  StandartHTMLElement,
  StandartInput,
  StandartButton,
  StandartLi,
  StandartLabel,
  StandartSpanMarker,
  StandartTaskText
} from './elements-factory'

abstract class ElementCreator {
  abstract factoryMethod (): StandartHTMLElement 

  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartHeaderCreator extends ElementCreator {
  factoryMethod(): StandartHTMLElement {
    const header =  new StandartHTMLElement('header', 'todo-header container')
    const title = new StandartHTMLElement('h1', 'todo-header__title')
    header.getElem().append(title.getElem())
    return header
  }
  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartFooterCreator extends ElementCreator {
  factoryMethod(): StandartHTMLElement {
    return new StandartHTMLElement ('footer', 'todo-footer container')
  }
  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartMainCreator extends ElementCreator {
  factoryMethod(): StandartHTMLElement {
    return new StandartHTMLElement ('main', 'todo-main container')
  }
  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartDivCreator extends ElementCreator {
  classNames: string
  constructor (classNames:string) {
    super()
    this.classNames = classNames
  }
  factoryMethod(): StandartHTMLElement {
    return new StandartHTMLElement ('div', this.classNames)
  }
  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartSectionCreator extends ElementCreator {
  classNames: string
  constructor (classNames:string) {
    super()
    this.classNames = classNames
  }
  factoryMethod(): StandartHTMLElement {
    return new StandartHTMLElement('section', this.classNames)
  }

  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartUlCreator extends ElementCreator {
  classNames: string
  constructor (classNames:string) {
    super()
    this.classNames = classNames
  }
  factoryMethod(): StandartHTMLElement {
    return new StandartHTMLElement('ul', this.classNames)
  }

  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartInputCreator extends ElementCreator {
  factoryMethod(): StandartInput {
    return new StandartInput('item__marker-checkbox visually-hidden', 'text')
  }
  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartTitleCreator extends ElementCreator {
  private titleValue: string
  constructor(titleValue: string) {
    super()
    this.titleValue = titleValue
  }
  factoryMethod(): StandartHTMLElement {
    return new StandartHTMLElement('h1', 'todo-header__title', this.titleValue)
  }
  get elem() {
    return this.factoryMethod().getElem()
  }
}

export class StandartSubTitleCreator extends ElementCreator {
  private titleValue: string
  constructor(titleValue: string) {
    super()
    this.titleValue = titleValue
  }
  factoryMethod(): StandartHTMLElement {
    return new StandartHTMLElement('h3', 'todo-header__subtitle', this.titleValue)
  }
  get elem() {
    return this.factoryMethod().getElem()
  }
}

export class StandartCheckboxCreator extends ElementCreator {
  private isDone: boolean
  constructor (isDone: boolean) {
    super()
    this.isDone = isDone
  }
  factoryMethod(): StandartInput {
    const checkBox =  new StandartInput('item__marker-checkbox visually-hidden', 'checkbox')
    checkBox.getElem().checked = this.isDone
    return checkBox
  }
  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartLiCreator extends ElementCreator {
  factoryMethod (): StandartLi {
    return new StandartLi ('task-section__item')
  }
  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartLabelCreator extends ElementCreator {
  factoryMethod (): StandartLabel {
    return new StandartLabel ('task-section__item')
  }
  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartCheckBoxMarkerCreator extends ElementCreator {
  factoryMethod (): StandartSpanMarker {
    return new StandartSpanMarker('marker-checkbox checkbox')
  }
  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartTaskTextCreator extends ElementCreator {
  taskValue: string
  constructor(taskValue: string) {
    super()
    this.taskValue = taskValue
  }
  factoryMethod(): StandartTaskText {
    return new StandartTaskText('item-text', this.taskValue)
  }

  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartButtonCreator extends ElementCreator {
  classNames: string
  valueButton: string
  constructor(classNames: string, valueButton: string) {
    super()
    this.classNames = classNames
    this.valueButton = valueButton
  }
  factoryMethod(): StandartButton {
    return new StandartButton(this.classNames, this.valueButton)
  }
  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartRedactButtonCreator extends ElementCreator {
  factoryMethod(): StandartButton {
    const button = new StandartButton('item-text-refactror__btn btn')
    const valueButton = new StandartSpanMarker('visually-hidden').getElem()
    valueButton.textContent = 'Redact text task'
    button.getElem().append(valueButton)
    return button
  }

  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartDeleteButtonCreator extends ElementCreator {
  factoryMethod(): StandartButton {
    const button = new StandartButton('item-delete-task__btn btn')
    const valueButton = new StandartSpanMarker('visually-hidden').getElem()
    valueButton.textContent = 'Delete task'
    button.getElem().append(valueButton)
    return button
  }

  get elem () {
    return this.factoryMethod().getElem()
  }
}