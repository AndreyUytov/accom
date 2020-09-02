import './pages/index.html'

import './styles/index.scss'

import Task from './js/task'

const task = new Task('Задача')

task.render()

task.addDeleteListener(console.log)

task.addRedactorListener(console.log)

task.addCheckboxListener((...args) => console.log('из chekcbox-а ' + args))

