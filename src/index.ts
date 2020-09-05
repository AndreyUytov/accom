import './pages/index.html'

import './styles/index.scss'

import Task from './js/components/task'

import store from './js/store/store'

store.subscribe(() => console.log(store.getState()))

store.dispatch({type: 'DELETE_TASK', taskId: 1})
