import {Day, GUIFactory} from './../types'

export default class Header {
  private header: HTMLElement
  private title: HTMLElement
  private subTitle: HTMLElement
  constructor(factory: GUIFactory) {
    this.header = factory.header
    this.title = factory.headerTitle
    this.title.textContent = 'ToDo'
    this.subTitle = factory.headerSubTitle
    this.subTitle.textContent = Day[new Date().getDay()]
    this.build()
  }

  private build () {
    this.header.append(this.title, this.subTitle)
  }

  get elem () {
    return this.header
  }

}