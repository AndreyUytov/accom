import {
  StandartHTMLElement,
  StandartInput,
  StandartButton,
  StandartLi,
  StandartLabel,
  StandartSvgMarker,
} from './elements-factory'

import { GUIFactory } from './../types'

export default class StandartFactory implements GUIFactory {
  get header() {
    return new StandartHTMLElement('header', 'todo-header container').getElem()
  }

  get headerTitle() {
    return new StandartHTMLElement('h1', 'todo-header__title').getElem()
  }

  get headerSubTitle() {
    return new StandartHTMLElement('h3', 'todo-header__subtitle').getElem()
  }

  get main() {
    return new StandartHTMLElement('main', 'todo-main container').getElem()
  }

  get taskCreatorSection() {
    return new StandartHTMLElement('section', 'task-creator-section').getElem()
  }

  get taskCreatorSectionWrapper() {
    return new StandartHTMLElement('div', 'task-creator__form').getElem()
  }

  get taskCreatorSectionLabel() {
    return new StandartLabel('task-creator__label').getElem()
  }

  get taskCreatorSectionInput() {
    return new StandartInput('task-creator__input', 'text').getElem()
  }

  get taskSection() {
    return new StandartHTMLElement('section', 'task-section').getElem()
  }

  get taskSectionTaskList() {
    return new StandartHTMLElement('ul', 'task-section__list').getElem()
  }

  get taskItem() {
    return new StandartLi('task-section__item').getElem()
  }

  get taskLabel() {
    return new StandartLabel('item__chekbox-label').getElem()
  }

  get taskCheckBox() {
    return new StandartInput(
      'item__marker-checkbox visually-hidden',
      'checkbox'
    ).getElem()
  }

  get taskCheckBoxMarker() {
    const marker = new StandartSvgMarker(
      'marker-checkbox checkbox',
      '#checkbox-marker'
    ).getElem()
    return marker
  }

  get taskValue() {
    return new StandartHTMLElement('p', 'item-text').getElem()
  }

  get taskRedactBtn() {
    const marker = new StandartSvgMarker(
      'edit-svg__wrapper',
      '#edit-marker'
    ).getElem()
    const btn = new StandartButton('item-text-refactror__btn btn').getElem()
    btn.append(marker)
    return btn
  }

  get taskDeleteBtn() {
    const marker = new StandartSvgMarker(
      'edit-svg__wrapper',
      '#close-marker'
    ).getElem()
    const btn = new StandartButton('item-delete-task__btn btn').getElem()
    btn.append(marker)
    return btn
  }

  get taskCreatorAddBtn() {
    const marker = new StandartSvgMarker(
      'edit-svg__wrapper',
      '#add-task-marker'
    ).getElem()
    const btn = new StandartButton('task-creator__btn btn').getElem()
    btn.append(marker)
    return btn
  }

  get taskModalInput() {
    return new StandartInput('item__modal-input', 'text').getElem()
  }

  get footer() {
    return new StandartHTMLElement('footer', 'todo-footer container').getElem()
  }

  get footerLeftSection() {
    return new StandartHTMLElement('section', 'sort-task-section').getElem()
  }

  get footerRightSection() {
    return new StandartHTMLElement(
      'section',
      'todo-footer__total-table'
    ).getElem()
  }

  get footerLeftSectionWrapper() {
    return new StandartHTMLElement('div', 'sort-task__wrapper').getElem()
  }

  get footerCompleteBtn() {
    return new StandartButton(
      'sort-task-section__complete-all-button button',
      'All complete'
    ).getElem()
  }

  get footerRemoveCompleteBtn() {
    return new StandartButton(
      'sort-task-section__remove-comlete-button button',
      'Remove comlete'
    ).getElem()
  }

  get footerTotalTask() {
    return new StandartHTMLElement('p', 'total-table__total-tasks').getElem()
  }

  get footerTotalCompleteTask() {
    return new StandartHTMLElement('p', 'total-table__total-complete').getElem()
  }
}
