import {
  StandartSectionCreator,
  StandartDivCreator,
  StandartInputCreator,
  StandartButtonCreator,
  StandartLabelCreator
} from './../utility/standart-elements-creators'

export default class TaskSectionCreator {
  private section: HTMLElement
  private wrapper: HTMLElement
  private label: HTMLElement
  private input: HTMLInputElement
  private button: HTMLButtonElement
  constructor() {
    this.section = new StandartSectionCreator('task-creator-section').elem
    this.wrapper = new StandartDivCreator('task-creator__form').elem
    this.label = new StandartLabelCreator('task-creator__label').elem
    this.button = new StandartButtonCreator('task-creator__submit').elem
    this.input = new StandartInputCreator('task-creator__input').elem
    this.build()
  }

  private build() {
    this.input.placeholder = 'Add new task'

    this.label.append(this.input, this.button)
    this.wrapper.append(this.label)
    this.section.append(this.wrapper)
  }

  public onTaskCreatorBtnClick (cb:(taskValue: string) => any) {
    const addNewTask = () => {
      cb(this.input.value.trim())
      this.input.value = ''
    }
    this.button.onclick = addNewTask
    this.input.onkeydown = (evt) => evt.keyCode === 13 ? addNewTask() : null
  }

  get elem() {
    return this.section
  }
}