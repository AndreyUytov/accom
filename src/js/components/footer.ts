import {
  StandartFooterCreator,
  StandartSectionCreator,
  StandartDivCreator,
  StandartButtonCreator,
  StandartTaskTextCreator
} from './../utility/standart-elements-creators'

export default class Footer {
  private footer: HTMLElement
  private sectionLeft: HTMLElement
  private sectionRight: HTMLElement
  private wrapperSectionLeft: HTMLElement
  private btnComplete: HTMLButtonElement
  private btnRemoveComplete: HTMLButtonElement
  private totalTasks: HTMLElement
  private totalComlete: HTMLElement

  constructor(tasksLength: number, tasksCompleteLength: number,
    removeAllCompleteActionCreator: () => void, doAllTasksCompleteAction: () => void) {
    this.footer = new StandartFooterCreator().elem
    this.sectionLeft = new StandartSectionCreator('sort-task-section').elem
    this.sectionRight = new StandartSectionCreator('todo-footer__total-table').elem
    this.wrapperSectionLeft = new StandartDivCreator('sort-task__wrapper').elem
    this.btnComplete = new StandartButtonCreator('sort-task-section__complete-all-button button', 'All complete').elem
    this.btnRemoveComplete = new StandartButtonCreator('sort-task-section__remove-comlete-button button', 'Remove comlete').elem
    this.totalTasks = new StandartTaskTextCreator(`Total tasks: ${tasksLength}`, 'total-table__total-tasks').elem
    this.totalComlete = new StandartTaskTextCreator(`Total complete: ${tasksCompleteLength}`, 'total-table__total-complete').elem
    this.onBtnCompleteClick(doAllTasksCompleteAction)
    this.onBtnRemoveCompleteClick(removeAllCompleteActionCreator)
    this.build()
  }

  private build() {
    this.sectionRight.append(this.totalComlete, this.totalTasks)
    this.wrapperSectionLeft.append(this.btnComplete, this.btnRemoveComplete)
    this.sectionLeft.append(this.wrapperSectionLeft)
    this.footer.append(this.sectionLeft, this.sectionRight)
  }

  private onBtnCompleteClick(cb:() => any) {
    this.btnComplete.onclick = () => cb()
  }
  private onBtnRemoveCompleteClick(cb:() => any) {
    this.btnRemoveComplete.onclick = () => cb()
  }

  public update(totalTasks: number, totalComplete: number) {
    if (totalTasks === 0) {
      this.footer.innerHTML = ``
    } else  {
      this.totalComlete.textContent = `Total complete: ${totalComplete}`
      this.totalTasks.textContent = `Total tasks: ${totalTasks}`
      this.build()
      console.log('from footer')
    }
  }

  get elem() {
    return this.footer
  }
}