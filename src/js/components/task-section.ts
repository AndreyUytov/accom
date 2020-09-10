import {
  StandartSectionCreator,
  StandartUlCreator
} from './../utility/standart-elements-creators'
import {
  TaskInterface,
  CheckBoxAction,
  RedactAction,
  RemoveAction
} from './../types'
import Task from './task'

export default class TaskSection {
  private section: HTMLElement
  private ul: HTMLElement
  private tasksView: Task []
  constructor (tasks: TaskInterface [], onCheckboxChange: CheckBoxAction,
    onRedactBtnClick: RedactAction, onDeleteBtnClick: RemoveAction) {
    this.section = new StandartSectionCreator('task-section').elem
    this.ul = new StandartUlCreator('task-section__list').elem
    this.tasksView = tasks.map((elem) => new Task(elem, onCheckboxChange, onRedactBtnClick, onDeleteBtnClick))
    this.build()
  }

  private build() {
    this.ul.prepend(...this.tasksView.map((task) => task.elem))
    this.section.append(this.ul)
  }

  get elem() {
    return this.section
  }

  private sortTaskView (a:TaskInterface,b:TaskInterface) {
    if (a.isDone === true && b.isDone === false) return 1
    else if ((a.isDone === true && b.isDone === true) || (a.isDone === false && b.isDone === false)) return 0
    else return -1
  }

  public update(tasks: TaskInterface [], onCheckboxChange: CheckBoxAction,
    onRedactBtnClick: RedactAction, onDeleteBtnClick: RemoveAction) {
    // for remove Task
    if (tasks.length < this.tasksView.length) {
      let taskIds = tasks.map((elem) => elem.taskId)
      this.tasksView.forEach((elem, i) => {
        if (!taskIds.includes(elem.id)) {
          elem.elem.remove()
          this.tasksView = tasks.map((elem) => new Task(elem, onCheckboxChange, onRedactBtnClick, onDeleteBtnClick))
          console.log('from 1 st if TaskSection')
        }
      })
    // For add new Task
    } else if (tasks.length > this.tasksView.length) {
       const newTask = new Task(tasks[tasks.length - 1],onCheckboxChange, onRedactBtnClick, onDeleteBtnClick)
       this.tasksView.push(newTask)
       this.ul.prepend(newTask.elem)
    // For another ...
     } else {
       console.log('update from last (if -else) TaskSection')
      let taskIds = tasks.map((elem) => elem.taskId)
      this.tasksView = this.tasksView.map((elem, i) => {
        elem.update(tasks[taskIds.indexOf(elem.id)])
        return elem
      })
     }
  }
}