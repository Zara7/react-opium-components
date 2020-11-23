import React, { useState } from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'

import Alert from './index'
import Button from '../OpiumButton'

import { Theme } from '../../Constants/Types/theme.types'

export const alert = () => {
  const message = text('Text', 'Alert')

  const [theme, setTheme] = useState<Theme>(Theme.DARK)
  const [popupIsOpen, setPopupIsOpen] = useState(false)
  const [checkBoxChecked, setCheckBoxChecked] = useState(false)

  return (
    <div style={{ padding: '0 3rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>{message}</h1>
      <div style={{ display: 'flex', marginBottom: '5rem' }}>
        <Button
          theme={theme}
          label="Light theme"
          variant='secondary'
          style={{ marginRight: '1rem' }}
          onClick={() => setTheme(Theme.LIGHT)}
        />
        <Button
          theme={theme}
          label="Dark theme"
          variant='primary'
          onClick={() => setTheme(Theme.DARK)}
        />
      </div>
      <Button theme={theme} label="Show / hide alert" onClick={() => setPopupIsOpen(!popupIsOpen)} />
      <Alert
        theme={theme}
        title='Alert title'
        size='lg'
        description='Description. Lorem lorem'
        attention={true}
        loading={false}
        closePopup={() => setPopupIsOpen(false)}
        popupIsOpen={popupIsOpen}
        showActionButton={true}
        handleAction={() => { }}
        actionButtonTitle='Action'
        cancelButtonTitle='Cancel'
        showCheckBox={true}
        handleCheckBoxChange={() => setCheckBoxChecked(!checkBoxChecked)}
        checkBoxChecked={checkBoxChecked}
        checkBoxLabel='Checkbox'
        hideCross={false}
      />
    </div>
  )
}

Alert.defaultProps = {
  theme: Theme.DARK,
  title: '',
  size: 'sm',
  description: '',
  attention: false,
  loading: false,
  closePopup: () => { },
  popupIsOpen: false,
  showActionButton: true,
  handleAction: () => { },
  actionButtonTitle: '',
  cancelButtonTitle: '',
  showCheckBox: true,
  handleCheckBoxChange: () => { },
  checkBoxChecked: true,
  checkBoxLabel: '',
  hideCross: false,
}

export default {
  title: 'Alert component',
  decorators: [withKnobs],
  component: Alert,
  parameters: {},
}