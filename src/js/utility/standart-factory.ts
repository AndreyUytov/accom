import {
  StandartHTMLElement,
  StandartInput,
  StandartButton,
  StandartLi,
  StandartLabel,
  StandartSpanMarker,
  StandartTaskText
} from './elements-factory'

import {
  GUIFactory,
  UniverseElement,
  InputElement,
  LiElement,
  LabelElement,
  SpanElement,
  ButtonElement
} from './../types'

// HeaderBlock

class Header implements UniverseElement {
  get elem () {
    return new StandartHTMLElement('header', 'todo-header container').getElem()
  }
}

class HeaderTitle implements UniverseElement {
  get elem () {
    return new StandartHTMLElement('h1', 'todo-header__title').getElem()
  }
}

class HeaderSubTitle implements UniverseElement {
  get elem () {
    return new StandartHTMLElement('h3', 'todo-header__subtitle').getElem()
  }
}

// MainBlock

class Main implements UniverseElement {
  get elem () {
    return new StandartHTMLElement ('main', 'todo-main container').getElem()
  }
}

// TaskCreatorSection

class TaskCreatorSection implements UniverseElement {
  get elem () {
    return new StandartHTMLElement('section', 'task-creator-section').getElem()
  }
}

class TaskCreatorSectionWrapper implements UniverseElement {
  get elem () {
    return new StandartHTMLElement('div', 'task-creator__form').getElem()
  }
}

class TaskCreatorSectionLabel implements LabelElement {
  get elem () {
    return new StandartLabel('task-creator__label').getElem()
  }
}

class TaskCreatorSectionInput implements InputElement {
  get elem () {
    return new StandartInput('task-creator__input', 'text').getElem()
  }
}

// TaskSection

class TaskSection implements UniverseElement {
  get elem () {
    return new StandartHTMLElement('section', 'task-section').getElem()
  }
}