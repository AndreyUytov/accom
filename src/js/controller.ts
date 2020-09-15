import createStore from './utility/createStore'
import rootReducer from './reducer/index'
import {StoreInterface, TaskInterface, GUIFactory} from './types'
import {
  checkTaskActionCreator,
  removeTaskActionCreator,
  addTaskActionCreator,
  redactTaskActionCreator,
  removeAllCompleteActionCreator,
  doAllTasksCompleteAction
} from './actions/index'

import StandarFactory from './utility/standart-factory'

import Header from './components/header'
import TaskSection from './components/task-section'
import TaskSectionCreator from './components/task-creator-section'
import Footer from './components/footer'


export default class Controller {
  factory: GUIFactory
  store: StoreInterface
  header: Header
  main: HTMLElement
  footer: Footer
  taskCreatorSection: TaskSectionCreator
  taskSection: TaskSection
  constructor () {
    const preloadData = (): {tasks: TaskInterface[], counter: number} => {
      let preloadedState
      if (localStorage.getItem('todoData')) {
        preloadedState = JSON.parse(localStorage.getItem('todoData'))
      }
      return preloadedState
    }
    this.store = createStore(rootReducer, preloadData())   
    let tasks = this.store.getState().tasks
    let completeTasks = tasks.filter(({isDone}: {isDone: boolean}) => isDone === true).length

    this.store.subscribe(() => {
      localStorage.setItem('todoData', JSON.stringify(this.store.getState()))
    })

    this.store.subscribe(() => console.log(this.store.getState().tasks, this.store.getState().counter))

    this.factory = new StandarFactory()

    this.removeTaskAction = this.removeTaskAction.bind(this)
    this.checkTaskAction = this.checkTaskAction.bind(this)
    this.addTaskAction = this.addTaskAction.bind(this)
    this.redactTaskAction = this.redactTaskAction.bind(this)
    this.removeAllCompleteAction = this.removeAllCompleteAction.bind(this)
    this.doAllTasksCompleteAction = this.doAllTasksCompleteAction.bind(this)

    this.header = new Header(this.factory)
    this.main = this.factory.main
    this.footer = new Footer(tasks.length, completeTasks, this.removeAllCompleteAction, this.doAllTasksCompleteAction, this.factory)
    this.taskSection = new TaskSection(tasks, this.checkTaskAction, this.redactTaskAction, this.removeTaskAction, this.factory)

    this.taskCreatorSection = new TaskSectionCreator(this.addTaskAction, this.factory)

    this.subscribeTaskSection()
    this.subscribeFooter()
    this.subscribeCntrrender()
  }

  private subscribeTaskSection() {
    this.store.subscribe(() => {
      this.taskSection.update(this.store.getState().tasks,
       this.checkTaskAction, this.redactTaskAction, this.removeTaskAction, this.factory)
    }
    )
  }

  private subscribeFooter() {
    this.store.subscribe(() => {
      this.footer.update(this.store.getState().tasks.length,
       this.store.getState().tasks.filter(({isDone}: {isDone: boolean}) => isDone === true).length)
    })
  }

  private subscribeCntrrender () {
    this.store.subscribe(() => {
      if (this.store.getState().tasks.length !== 0) {
        document.body.append(this.footer.elem)
      }
    })
  }

  private checkTaskAction(id: number, isDone: boolean) {
    this.store.dispatch(checkTaskActionCreator(id, isDone))
  }

  private removeTaskAction(id: number) {
    this.store.dispatch(removeTaskActionCreator(id))
  }
  
  private addTaskAction(taskValue: string) {
    let id = this.store.getState().counter
    this.store.dispatch(addTaskActionCreator(id, taskValue))
  }

  private redactTaskAction(id: number, newValue: string) {
    this.store.dispatch(redactTaskActionCreator(id, newValue))
  }

  private removeAllCompleteAction() {
    this.store.dispatch(removeAllCompleteActionCreator())
  }

  private doAllTasksCompleteAction() {
    this.store.dispatch(doAllTasksCompleteAction())
  }

  render() {
    this.main.append(this.taskCreatorSection.elem, this.taskSection.elem)
    document.body.append(this.header.elem, this.main)
    this.store.getState().tasks.length ? document.body.append(this.footer.elem) : ''
  }

}