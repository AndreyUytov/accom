import {
  StandartHeaderCreator,
  StandartTitleCreator,
  StandartSubTitleCreator
} from './../utility/standart-elements-creators'
import {Day} from './../types'

export default class Header {
  private header: HTMLElement
  private title: HTMLElement
  private subTitle: HTMLElement
  constructor() {
    this.header = new StandartHeaderCreator().elem
    this.title = new StandartTitleCreator('ToDo').elem
    this.subTitle = new StandartSubTitleCreator(Day[new Date().getDay()]).elem
    this.build()
  }

  private build () {
    this.header.append(this.title, this.subTitle)
  }

  get elem () {
    return this.header
  }

}