import React, { FC, useState, BaseSyntheticEvent, ReactNode } from 'react'
import { Dropdown } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'

import { Theme } from '../../Constants/Types/theme.types'
import { generateRenderProps } from '../../Utils/helpers'

import './DropdownSelector.scss'

export type Props = {
  /** Define theme */
  theme?: Theme
  /** Title, if controlled */
  title?: string | ReactNode
  /** Value passed to the onSelect handler, useful for identifying the selected menu item */
  eventKey?: any
  /** Set dropping down options */
  items?: { title?: string, value?: string, href?: string, to?: string, as?: string | ReactNode }[]
  /** Function, that became active by clicking on an option */
  onClick?: Function
  /** Function, that became active after an option has become selected */
  onSelect?: (eventKey: any, event: BaseSyntheticEvent) => any
  /** Set class selectors */
  className?: string
  /** Set class selectors */
  isControlled?: boolean
}

const defaultProps: Props = {
  theme: Theme.DARK,
  items: [
    { title: 'First', value: '1', href: '' },
    { title: 'Second', value: '2', href: '' },
  ],
  className: '',
  title: '',
  onClick: () => { },
  onSelect: (eventKey: any, event: BaseSyntheticEvent) => { },
}

const DropdownSelector: FC<Props> = (props: Props) => {
  const renderProps = generateRenderProps(defaultProps, props)
  const {
    title,
    items,
    theme,
    onClick,
    onSelect,
    className,
    uncontrolled,
  } = renderProps

  const [selectorTitle, setSelectorTitle] = useState<any>(items.length ? items[0].title : '')

  const handleSelect = (key: any, event: BaseSyntheticEvent) => {
    setSelectorTitle(event.target.innerText)
  }

  return (
    <Dropdown className={`color-scheme-${theme} ${className}`}>
      <Dropdown.Toggle id="dropdown-selector-toggle" className={`color-scheme-${theme}`}>
        {title || selectorTitle}
      </Dropdown.Toggle>
      <Dropdown.Menu className={`color-scheme-${theme}`}>
        {
          items.length ? items.map((item: any, idx: number) => (
            <Dropdown.Item
              key={uuidv4()}
              eventKey={`${idx}`}
              href={item.href}
              to={item.to}
              onClick={onClick}
              onSelect={uncontrolled ? handleSelect : onSelect}
              className={`color-scheme-${theme}`}
              as={item.as}
            >
              {item.title}
            </Dropdown.Item>
          )) : null
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownSelector
