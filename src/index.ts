import './pages/index.html'

import './styles/index.scss'

import {StandartMainCreator} from './js/utility/standart-elements-creators'

import Header from './js/components/header'
import TaskSection from './js/components/task-section'
import TaskSectionCreator from './js/components/task-creator-section'

import Footer from './js/components/footer'


import store from './js/store/store'

store.subscribe(() => console.log(store.getState()))

store.dispatch({type: 'DELETE_TASK', taskId: 1})
store.dispatch({type: 'DELETE_TASK', taskId: 4})

const tasks = store.getState().tasksReducer
const tasksLength = tasks.length
const completeTasks = tasks.filter(({isDone}: {isDone: boolean}) => isDone === true).length

const rootElem = document.body.querySelector('.root')

const creatorTask = new TaskSectionCreator().elem
const TaskSectionList = new TaskSection(tasks).elem

const main = new StandartMainCreator().elem
main.append(creatorTask, TaskSectionList)

const header = new Header().elem
const footer = new Footer(tasksLength, completeTasks).elem

rootElem.append(header, main, footer)
