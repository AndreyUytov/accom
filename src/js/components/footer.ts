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

  constructor(tasksLength: number, tasksCompleteLength: number) {
    this.footer = new StandartFooterCreator().elem
    this.sectionLeft = new StandartSectionCreator('sort-task-section').elem
    this.sectionRight = new StandartSectionCreator('todo-footer__total-table').elem
    this.wrapperSectionLeft = new StandartDivCreator('sort-task__wrapper').elem
    this.btnComplete = new StandartButtonCreator('sort-task-section__complete-all-button button', 'All complete').elem
    this.btnRemoveComplete = new StandartButtonCreator('sort-task-section__remove-comlete-button button', 'Remove comlete').elem
    this.totalTasks = new StandartTaskTextCreator(tasksLength.toString(), 'total-table__total-tasks').elem
    this.totalComlete = new StandartTaskTextCreator(tasksCompleteLength.toString(), 'total-table__total-complete').elem
    this.build()
  }

  build() {
    this.sectionRight.append(this.totalComlete, this.totalTasks)
    this.wrapperSectionLeft.append(this.btnComplete, this.btnRemoveComplete)
    this.sectionLeft.append(this.wrapperSectionLeft)
    this.footer.append(this.sectionLeft, this.sectionRight)
  }
  get elem() {
    return this.footer
  }
}