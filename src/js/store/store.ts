import createStore from './../utility/createStore'
import rootReducer from './reducer'

const preloadedState = {
  tasksReducer: [
    {taskId:0,taskValue:'hello',isDone:true},
    {taskId:1,taskValue:'world',isDone:false},
    {taskId:2,taskValue:'!',isDone:false}
  ]
}

export default createStore(rootReducer, preloadedState)