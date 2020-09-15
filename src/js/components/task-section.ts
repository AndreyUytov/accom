import {
  TaskInterface,
  CheckBoxAction,
  RedactAction,
  RemoveAction,
  GUIFactory
} from './../types'
import Task from './task'

export default class TaskSection {
  private section: HTMLElement
  private ul: HTMLElement
  private tasksView: Task []
  constructor (tasks: TaskInterface [], onCheckboxChange: CheckBoxAction,
    onRedactBtnClick: RedactAction, onDeleteBtnClick: RemoveAction, factory: GUIFactory) {
    this.changeCheckBox = this.changeCheckBox.bind(this)
    this.section = factory.taskSection
    this.ul = factory.taskSectionTaskList
    this.tasksView = tasks.sort(this.sortTaskView).map((elem) => new Task(elem, onCheckboxChange, onRedactBtnClick, onDeleteBtnClick,this.changeCheckBox, factory))
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
    onRedactBtnClick: RedactAction, onDeleteBtnClick: RemoveAction, factory: GUIFactory) {
      let taskIds = tasks.map((elem) => elem.taskId)
    // for remove Task
    if (tasks.length < this.tasksView.length) {
      this.tasksView = this.tasksView.reduce((result, elem) => {
        if (!taskIds.includes(elem.id)) {
          elem.elem.remove()
        } else result.push(elem)
        return result
      }, [])
    // For add new Task
    } else if (tasks.length > this.tasksView.length) {
       const newTask = new Task(tasks[tasks.length - 1],onCheckboxChange, onRedactBtnClick, onDeleteBtnClick, this.changeCheckBox, factory)
       this.tasksView.push(newTask)
       this.ul.prepend(newTask.elem)
    // For another ...
     } else {
      this.tasksView.forEach((elem) => {
        elem.update(tasks[taskIds.indexOf(elem.id)])
      })
     }
  }

  get elem() {
    return this.section
  }
}