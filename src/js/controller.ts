import Header from './components/header'
import TaskSection from './components/task-section'
import TaskSectionCreator from './components/task-creator-section'
import Footer from './components/footer'

import {StandartMainCreator} from './utility/standart-elements-creators'
import createStore from './utility/createStore'
import rootReducer from './reducer/index'
import {StoreInterface,
        TaskInterface
} from './types'
import Task from './components/task'

export default class Controller {
  store: StoreInterface
  header: Header
  main: HTMLElement
  footer: Footer
  taskCreatorSection: TaskSectionCreator
  taskSection: TaskSection
  constructor () {
    const preloadedState = {
      tasks: [
        {taskId:0,taskValue:'hello',isDone:true},
        {taskId:1,taskValue:'world',isDone:false},
        {taskId:2,taskValue:'!',isDone:false}
      ],
      counter: 5
    }
    this.store = createStore(rootReducer, preloadedState)   
    let tasks = this.store.getState().tasks
    let completeTasks = tasks.filter(({isDone}: {isDone: boolean}) => isDone === true).length

    this.store.subscribe(() => console.log(this.store.getState().tasks, this.store.getState().counter))

    this.removeTaskAction = this.removeTaskAction.bind(this)
    this.checkTaskAction = this.checkTaskAction.bind(this)
    this.addTaskAction = this.addTaskAction.bind(this)
    this.redactTaskAction = this.redactTaskAction.bind(this)
    this.removeAllCompleteAction = this.removeAllCompleteAction.bind(this)
    this.doAllTasksCompleteAction = this.doAllTasksCompleteAction.bind(this)

    this.header = new Header()
    this.main = new StandartMainCreator().elem
    this.footer = new Footer(tasks.length, completeTasks)
    this.taskSection = new TaskSection(tasks)
    this.taskSection.tasks.forEach((elem) => {
      elem.onDeleteBtnClick(this.removeTaskAction)
      elem.onCheckboxChange(this.checkTaskAction)
      elem.onRedactBtnClick(this.redactTaskAction)
    })
    // this.taskSection.update = () => {
    //   let taskFromStore = this.store.getState().tasks
    //   let tasksFromView = this.taskSection.tasksView
    //   if (taskFromStore.length > tasksFromView.length) {
    //     console.log(taskFromStore, tasksFromView)
    //     const newTask = new Task(taskFromStore[taskFromStore.length - 1])
    //     newTask.onCheckboxChange(this.checkTaskAction)
    //     newTask.onRedactBtnClick(this.redactTaskAction)
    //     newTask.onDeleteBtnClick(this.removeTaskAction)
    //     this.taskSection.tasksView.push(newTask)
    //     this.taskSection.ul.prepend(newTask.elem)
    //   }
    // }
    this.taskCreatorSection = new TaskSectionCreator()
    this.taskCreatorSection.onTaskCreatorBtnClick(this.addTaskAction)

    this.footer.onBtnCompleteClick(this.doAllTasksCompleteAction)
    this.footer.onBtnRemoveCompleteClick(this.removeAllCompleteAction)

    this.subscribeTaskSection()
    this.subscribeFooter()
  }

  render() {
    this.main.append(this.taskCreatorSection.elem, this.taskSection.elem)
    document.body.append(this.header.elem, this.main, this.footer.elem)
  }

  private subscribeTaskSection() {
    this.store.subscribe(() => {
      this.taskSection.update(this.store.getState().tasks,
       this.checkTaskAction, this.redactTaskAction, this.removeTaskAction)
      // this.taskSection.update()
    }
    )
  }

  private subscribeFooter() {
    this.store.subscribe(() => {
      this.footer.update(this.store.getState().tasks.length,
       this.store.getState().tasks.filter(({isDone}: {isDone: boolean}) => isDone === true).length)
    })
  }

  checkTaskAction(id: number, isDone: boolean) {
    this.store.dispatch({
      type: 'CHECK_TASK',
      id,
      isDone
    })
  }

  removeTaskAction(id: number) {
    this.store.dispatch({
      type: 'REMOVE_TASK',
      id
    })
  }
  
  addTaskAction(taskValue: string) {
    let id = this.store.getState().counter
    this.store.dispatch({
      type: 'ADD_NEW_TASK',
      taskValue,
      id
    })
  }

  redactTaskAction(id: number, newValue: string) {
    this.store.dispatch({
      type: 'REDACT_TASK',
      id,
      newValue
    })
  }

  removeAllCompleteAction() {
    this.store.dispatch({
      type: 'REMOVE_COMPLETE_TASKS'
    })
  }

  doAllTasksCompleteAction() {
    this.store.dispatch({
      type: 'DO_ALL_TASKS_COMPLETE'
    })
  }

}