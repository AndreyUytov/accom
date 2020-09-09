import {
  StandartSectionCreator,
  StandartUlCreator
} from './../utility/standart-elements-creators'
import {
  TaskInterface,
  CheckBoxActionCreator,
  RedactActionCreator,
  RemoveActionCreator
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

  get ulElement() {
    return this.ul
  }

  public update(tasks: TaskInterface [], onCheckboxChange: CheckBoxActionCreator,
    onRedactBtnClick: RedactActionCreator, onDeleteBtnClick: RemoveActionCreator) {
    // for remove Task
    if (tasks.length < this.tasksView.length) {
      const taskIds = tasks.map((elem) => elem.taskId)
      this.tasksView.forEach((elem) => {
        if (!taskIds.includes(elem.id)) {
          elem.elem.remove()
        }
      })
    }
     if (tasks.length > this.tasksView.length) {
       const newTask = new Task(tasks.pop())
       newTask.onCheckboxChange(onCheckboxChange)
       newTask.onRedactBtnClick(onRedactBtnClick)
       newTask.onDeleteBtnClick(onDeleteBtnClick)
       this.ul.prepend(newTask.elem)
     }

     
  }

}