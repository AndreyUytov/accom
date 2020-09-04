import './pages/index.html'

import './styles/index.scss'

import Task from './js/components/task'

const task = new Task('Задача')

task.elem

task.addDeleteListener(console.log)

task.addRedactorListener(console.log)

task.addCheckboxListener((...args) => console.log('из chekcbox-а ' + args))

