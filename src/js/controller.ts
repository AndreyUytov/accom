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

// store.subscribe(() => console.log(store.getState()))

const rootElem = document.body.querySelector('.root')

export default class Controller {
  store: StoreInterface
  header: Header
  main: StandartMainCreator
  footer: Footer
  taskCreatorSection: TaskSectionCreator
  taskSection: TaskSection
  constructor () {
    const preloadedState = {
      tasksReducer: [
        {taskId:0,taskValue:'hello',isDone:true},
        {taskId:1,taskValue:'world',isDone:false},
        {taskId:2,taskValue:'!',isDone:false}
      ]
    }
    this.store = createStore(rootReducer, preloadedState)   
    let tasks = this.store.getState().tasksReducer
    let completeTasks = tasks.filter(({isDone}: {isDone: boolean}) => isDone === true).length

    this.header = new Header()
    this.main = new StandartMainCreator()
    this.footer = new Footer(tasks.length, completeTasks)

    this.removeTaskAction = this.removeTaskAction.bind(this)
    this.removeAllCompleteAction = this.removeAllCompleteAction.bind(this)
    this.doAllTasksCompleteAction = this.doAllTasksCompleteAction.bind(this)

    this.footer.onBtnCompleteClick(this.doAllTasksCompleteAction)
    this.footer.onBtnRemoveCompleteClick(this.removeAllCompleteAction)

    this.subscribeFooter()
  }
  render() {
    rootElem.append(this.header.elem, this.main.elem, this.footer.elem)
  }

  private subscribeFooter() {
    this.store.subscribe(() => {
      this.footer.update(this.store.getState().tasksReducer.length,
       this.store.getState().tasksReducer.filter(({isDone}: {isDone: boolean}) => isDone === true).length)
    })
  }

  removeTaskAction(id: number) {
    this.store.dispatch({
      type: 'REMOVE_TASK',
      taskId: id
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