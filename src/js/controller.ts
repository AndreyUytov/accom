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
  view: HTMLElement
  header: Header
  main: StandartMainCreator
  footer: Footer
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

    this.updateFooter()
    this.footer.probaDispatch(this.removeTask)
  }
  render() {
    rootElem.append(this.header.elem, this.main.elem, this.footer.elem)
  }

  private updateFooter() {
    this.store.subscribe(() => {
      this.footer.update(this.store.getState().tasksReducer.length, this.store.getState().tasksReducer.filter(({isDone}: {isDone: boolean}) => isDone === true).length)
    })
  }

  removeTask(id: number = 1) {
    this.store.dispatch({
      type: 'REMOVE_TASK',
      taskId: id
    })
  }

}