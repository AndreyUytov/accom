import {
  StandartSectionCreator,
  StandartUlCreator
} from './../utility/standart-elements-creators'
import {
  TaskInterface
} from './../types'
import Task from './task'

export default class TaskSection {
  private section: HTMLElement
  private ul: HTMLElement
  private tasksElements: HTMLElement []
  constructor (tasks: TaskInterface []) {
    this.section = new StandartSectionCreator('task-section').elem
    this.ul = new StandartUlCreator('task-section__list').elem
    this.tasksElements = tasks.map((elem) => new Task(elem).elem)
    this.build()
  }
  private build() {
    this.ul.append(...this.tasksElements)
    this.section.append(this.ul)
  }
  get elem() {
    return this.section
  }

}