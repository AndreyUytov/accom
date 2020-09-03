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

export class StandartInputCreator extends ElementCreator {
  factoryMethod(): StandartInput {
    return new StandartInput('item__marker-checkbox visually-hidden', 'text')
  }
  get elem () {
    return this.factoryMethod().getElem()
  }
}

export class StandartCheckboxCreator extends ElementCreator {
  factoryMethod(): StandartInput {
    return new StandartInput('item__marker-checkbox visually-hidden', 'checkbox')
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