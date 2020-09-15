import {GUIFactory} from './../types'

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
    removeAllCompleteActionCreator: () => void, doAllTasksCompleteAction: () => void, factory: GUIFactory) {
    this.footer = factory.footer
    this.sectionLeft = factory.footerLeftSection
    this.sectionRight = factory.footerRightSection
    this.wrapperSectionLeft = factory.footerLeftSectionWrapper
    this.btnComplete = factory.footerCompleteBtn
    this.btnRemoveComplete = factory.footerRemoveCompleteBtn
    this.totalTasks = factory.footerTotalTask
    this.totalTasks.textContent = `Total complete: ${tasksLength}`
    this.totalComlete = factory.footerTotalCompleteTask
    this.totalComlete.textContent = `Total complete: ${tasksCompleteLength}`
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
    }
  }

  get elem() {
    return this.footer
  }
}