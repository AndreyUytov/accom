import {
  HTMLProductsInterface
} from './types'

export class StandartHTMLElement implements HTMLProductsInterface {
  protected element: HTMLElement
  constructor(tag: string, styleNames?: string, text?: string) {
    this.element = document.createElement(tag)
    if (styleNames) {
      this.element.className = `${styleNames}`
    }
    if (text) {
      this.element.textContent = text
    }
  }

  getElem () {
    return this.element
  }
  
}

export class StandartInput extends StandartHTMLElement {
  element: HTMLInputElement
  constructor (styleNames: string, type: string) {
    super('input', styleNames)
    this.element.type = type
  }

  getElem () {
    return this.element
  }
}

export class StandartButton extends StandartHTMLElement {
  element: HTMLButtonElement
  constructor (styleNames: string, valueButton?: string) {
    super('button', styleNames)
    this.element.type = 'button'
    if(valueButton) {
      this.element.textContent = valueButton
    }
  }

  getElem () {
   return this.element
  }
}

export class StandartLi extends StandartHTMLElement {
  element: HTMLLIElement
  constructor(styleNames:string) {
    super('li', styleNames)
  }
  getElem () {
    return this.element
   }
}

export class StandartLabel extends StandartHTMLElement {
  element: HTMLLabelElement
  constructor (styleName:  string) {
    super('label', 'item__chekbox-label')
  }

  getElem () {
    return this.element
   }
}

export class StandartSpanMarker extends StandartHTMLElement {
  element: HTMLSpanElement
  constructor (styleName: string) {
    super('span', styleName)
  }

  getElem () {
    return this.element
   }
}

export class StandartTaskText extends StandartHTMLElement {
  element: HTMLParagraphElement
  constructor (styleName: string, taskValue: string) {
    super('p', styleName, taskValue)
  }

  getElem () {
    return this.element
   }
}