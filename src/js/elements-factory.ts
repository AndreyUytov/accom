class ElementsFactory {
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

class CheckboxFactory extends ElementsFactory {
  element: HTMLInputElement
  constructor (styleNames: string) {
    super('input', styleNames)
    this.element.type = 'checkbox'
  }

  getElem () {
    return this.element
  }
}

class ButtonFactory extends ElementsFactory {
  element: HTMLButtonElement
  constructor (styleNames: string) {
    super('button', styleNames)
    this.element.type = 'button'
  }

  getElem () {
   return super.getElem()
  }
}

export {ElementsFactory, CheckboxFactory, ButtonFactory}