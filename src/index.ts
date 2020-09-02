import './pages/index.html'

import './styles/index.scss'

import Task from './js/task'

const task = new Task('Задача')

task.render()

task.addDeleteOnClick(console.log)

