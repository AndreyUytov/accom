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
    this.changeCheckBox = this.changeCheckBox.bind(this)
    this.section = new StandartSectionCreator('task-section').elem
    this.ul = new StandartUlCreator('task-section__list').elem
    this.tasksView = tasks.sort(this.sortTaskView).map((elem) => new Task(elem, onCheckboxChange, onRedactBtnClick, onDeleteBtnClick,this.changeCheckBox))
    this.build()
  }

  private build() {
    this.ul.prepend(...this.tasksView.map((task) => task.elem))
    this.section.append(this.ul)
  }

  private changeCheckBox (evt: Event) {
    let elemTarget = evt.target as HTMLInputElement
    let elemCurrentTarget = evt.currentTarget as HTMLLIElement
    if(elemTarget.tagName === 'INPUT' && elemTarget.type === 'checkbox') {
      elemTarget.checked ? this.ul.append(elemCurrentTarget) : this.ul.prepend(elemCurrentTarget)
    }
  }

  private sortTaskView (a:TaskInterface,b:TaskInterface) {
    if (a.isDone === true && b.isDone === false) return 1
    else if ((a.isDone === true && b.isDone === true) || (a.isDone === false && b.isDone === false)) return 0
    else return -1
  }

  public update(tasks: TaskInterface [], onCheckboxChange: CheckBoxAction,
    onRedactBtnClick: RedactAction, onDeleteBtnClick: RemoveAction) {
      let taskIds = tasks.map((elem) => elem.taskId)
    // for remove Task
    if (tasks.length < this.tasksView.length) {
      this.tasksView = this.tasksView.reduce((result, elem) => {
        if (!taskIds.includes(elem.id)) {
          elem.elem.remove()
        } else result.push(elem)
        return result
      }, [])
      console.log('from 1 st if TaskSection', this.tasksView)
    // For add new Task
    } else if (tasks.length > this.tasksView.length) {
       const newTask = new Task(tasks[tasks.length - 1],onCheckboxChange, onRedactBtnClick, onDeleteBtnClick, this.changeCheckBox)
       this.tasksView.push(newTask)
       this.ul.prepend(newTask.elem)
    // For another ...
     } else {
      console.log('update from last (if -else) TaskSection')
      this.tasksView.forEach((elem) => {
        elem.update(tasks[taskIds.indexOf(elem.id)])
      })
     }
  }

  get elem() {
    return this.section
  }
}