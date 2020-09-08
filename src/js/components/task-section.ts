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
  private tasksView: Task []
  constructor (tasks: TaskInterface []) {
    this.section = new StandartSectionCreator('task-section').elem
    this.ul = new StandartUlCreator('task-section__list').elem
    this.tasksView = tasks.map((elem) => new Task(elem))
    this.build()
  }
  private build() {
    this.ul.append(...this.tasksView.map((task) => task.elem))
    this.section.append(this.ul)
  }
  get elem() {
    return this.section
  }

  get tasks () {
    return this.tasksView
  }

  public update(tasks: TaskInterface []) {
    // for remove Task
    if (tasks.length !== this.tasksView.length) {
      const taskIds = tasks.map((elem) => elem.taskId)
      this.tasksView.forEach((elem) => {
        if (!taskIds.includes(elem.id)) {
          elem.elem.remove()
        }
      })
    }
  }

}