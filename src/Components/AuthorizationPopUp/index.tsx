import React from 'react'
import { Modal } from 'react-bootstrap'

import { generateRenderProps } from '../../Utils/helpers'
import { ETheme } from '../../Constants/Types/theme.types'

import Checkbox from '../Checkbox'

import './AuthorizationPopUp.scss'

export type Props = {
  /** Define theme */
  theme?: ETheme

  popupIsOpen: boolean
  closePopup: () => void
  list: {name: string, image: string}[]
}

const defaultProps: Props = {
  theme: ETheme.DARK,
  popupIsOpen: false,
  closePopup: () => {},
  list: [{name: 'Test1', image: ''}]
}

const AuthorizationPopUp: React.FC<Props> = (props: Props) => {
  const renderProps = generateRenderProps(defaultProps, props)
  const [isMore, setIsMore] = React.useState(false)

  const {
    theme,
    list,
    popupIsOpen,
    closePopup
  } = renderProps

  return (
    <Modal
      // size={size}
      show={popupIsOpen}
      onHide={() => {
        setIsMore(false)
        closePopup()
      }}
      className="AuthorizationPopUp"
      contentClassName={`color-scheme-${theme}`}
    >
      <Modal.Header>
        <Modal.Title>connect wallet</Modal.Title>
        <button className="close-button" onClick={closePopup}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="2.00162" y1="2.05615" x2="15.5312" y2="15.5858" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <line x1="2.02563" y1="15.5296" x2="15.5553" y2="2.00001" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </Modal.Header>

      <Modal.Body>
        <Checkbox
          theme={theme}
          label="By proceeding to the platform You accept our Terms of service, Privat policy and Disclamer."
          onChange={() => {}}
        />
        <div className="AuthorizationPopUp__wallets">
          {
            list.map((el: {name: string, image: string}, i: number) => {
              if (i > 2 && !isMore) return null

              return (
              <button className="AuthorizationPopUp__wallet">
                <div className="AuthorizationPopUp__icon" style={{backgroundImage: el.image}}></div>
                <span>{el.name}</span>
              </button>)
            })
          }
          {/* <button className="AuthorizationPopUp__wallet">
            <div className="AuthorizationPopUp__icon" style={{backgroundImage: ''}}></div>
            <span>MetaMask</span>
          </button>
          <button className="AuthorizationPopUp__wallet">
            <div className="AuthorizationPopUp__icon" style={{backgroundImage: ''}}></div>
            <span>Other</span>
          </button>
          <button className="AuthorizationPopUp__wallet">
            <div className="AuthorizationPopUp__icon" style={{backgroundImage: ''}}></div>
            <span>Other Other</span>
          </button> */}
        </div>
        {
          !isMore &&
          (<button
            onClick={() => {
              setIsMore(true)
            }}
            className="AuthorizationPopUp__more">
            See more
          </button>)
        }
      </Modal.Body>
      {/* <Modal.Footer>
        <div className="buttons-wrap">
          {
            showActionButton &&
            <Button
              theme={theme}
              variant={'primary'}
              onClick={handleAction}
              label={actionButtonTitle}
            />
          }
          <Button
            theme={theme}
            variant={'secondary'}
            onClick={closePopup}
            label={cancelButtonTitle}
          />
        </div>
      </Modal.Footer> */}
    </Modal>
  )
}

export default AuthorizationPopUp
