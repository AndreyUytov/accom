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
  public ul: HTMLElement
  public tasksView: Task []
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
      this.tasksView.forEach((elem, i) => {
        if (!taskIds.includes(elem.id)) {
          elem.elem.remove()
          this.tasksView.splice(i, 1)
        }
      })
    } else if (tasks.length > this.tasksView.length) {
       const newTask = new Task(tasks[tasks.length - 1])
       newTask.onCheckboxChange(onCheckboxChange)
       newTask.onRedactBtnClick(onRedactBtnClick)
       newTask.onDeleteBtnClick(onDeleteBtnClick)
       this.tasksView.push(newTask)
       this.ul.prepend(newTask.elem)
     } else {
      this.tasksView = tasks.map((elem) => new Task(elem))
      this.ul.innerHTML = ``
      this.ul.append(...this.tasksView.map((task) => task.elem))
     }

     
  }
  // public update(){}
}