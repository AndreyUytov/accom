import './pages/index.html'

import './styles/index.scss'

import Header from './js/components/header'
import TaskSection from './js/components/task-section'

import store from './js/store/store'

store.subscribe(() => console.log(store.getState()))

store.dispatch({type: 'DELETE_TASK', taskId: 1})
store.dispatch({type: 'DELETE_TASK', taskId: 4})

document.body.append(new Header().elem, new TaskSection([{taskId:0,taskValue:'hello',isDone:true}]).elem)