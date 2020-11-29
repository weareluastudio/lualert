// REACT
import React, { CSSProperties, PureComponent } from 'react'

// STYLES
const Styles: {
  alertContainer: CSSProperties
  alertContent: CSSProperties
  alertContentH1: CSSProperties
  alertContentP: CSSProperties
  alertActions: CSSProperties
  alertActionsLiButton: CSSProperties
  cancelBtn: CSSProperties
  closeAlert: CSSProperties
  openAlert: CSSProperties
  openContent: CSSProperties
  closeContent: CSSProperties
} = {
  alertContainer: {
    width: '100%',
    height: '100vh',
    position: 'fixed',
    minWidth: '100%',
    top: '0',
    left: '0',
    zIndex: 100,
    transition: 'opacity 0.2s ease-in-out',
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontSize: '16px'
  },
  alertContent: {
    left: '50%',
    padding: '30px',
    width: 'calc(100% - 60px)',
    maxWidth: '455px',
    transition: 'transform 0.2s linear 0.2s, opacity 0.2s linear 0.2s',
    transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    background: '#fff',
    margin: 0,
    boxSizing: 'border-box',
    zIndex: 2,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
  },
  alertContentH1: {
    color: '#333',
    fontSize: '2em',
    margin: 0,
    marginBottom: '10px',
    boxSizing: 'border-box',
    fontWeight: 'bold'
  },
  alertContentP: {
    color: '#333',
    lineHeight: '20px',
    margin: 0,
    boxSizing: 'border-box'
  },
  alertActions: {
    margin: 0,
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    listStyle: 'none',
    position: 'relative',
    boxSizing: 'border-box',
    zIndex: 3
  },
  alertActionsLiButton: {
    textTransform: 'uppercase',
    color: '#fff',
    border: 'none',
    overflow: 'hidden',
    height: '45px',
    padding: '0 20px',
    outline: 'none',
    boxShadow: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: 0,
    boxSizing: 'border-box'
  },
  cancelBtn: {
    textTransform: 'uppercase',
    border: 'none',
    overflow: 'hidden',
    height: '45px',
    padding: '0 20px',
    outline: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    color: '#333',
    background: 'transparent',
    boxShadow: 'none',
    fontWeight: 400,
    margin: 0
  },
  closeAlert: { opacity: '0', pointerEvents: 'none' },
  openAlert: { opacity: '1', pointerEvents: 'all' },
  openContent: {
    opacity: '1',
    transform: 'scale(1)'
  },
  closeContent: {
    opacity: '0',
    transform: 'scale(0.6)'
  }
}

// ALERT PROPS
interface AlertProps {
  type: 'confirm' | 'window' | 'alert' | 'error'
  customElements?: JSX.Element
  nested?: AlertProps | string
  confirmBtn?: JSX.Element
  cancelBtn?: JSX.Element
  onConfirm?: () => any
  confirmText?: string
  cancelText?: string
  onHide?: () => any
  fixed?: boolean
  title: string
  body: string
}

// HOC PROPS
interface HOCProps {
  confirmColor?: string
  confirmText?: string
  cancelText?: string
  errColor?: string
  blurred?: boolean
  zIndex?: number
}

// ALERT STATE
interface InternalState extends AlertProps {
  open: boolean
}

// DEFAULT STATE
const defState: InternalState = {
  customElements: undefined,
  confirmText: undefined,
  cancelText: undefined,
  confirmBtn: undefined,
  onConfirm: undefined,
  cancelBtn: undefined,
  onHide: undefined,
  fixed: undefined,
  type: 'alert',
  open: false,
  title: '',
  body: ''
}

// TEMPLATE
class AlertTemplate extends PureComponent<HOCProps, InternalState> {
  constructor(props: HOCProps) {
    super(props)

    // STATE
    this.state = defState

    // METHODS
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.forceHide = this.forceHide.bind(this)
    this.confirm = this.confirm.bind(this)
  }

  // SHOW ALERT
  public show(props: AlertProps | string) {
    if (typeof props === 'string')
      this.setState({
        ...defState,
        type: 'alert',
        title: '',
        body: props,
        open: true
      })
    else this.setState({ ...defState, ...props, open: true })
  }

  // HIDE ALERT
  public hide() {
    if (!this.state.fixed) {
      if (this.state.onHide) this.state.onHide()
      const tmpNested: AlertProps | string | undefined = this.state.nested
      this.setState({ open: false, nested: undefined }, () => {
        if (tmpNested) this.show(tmpNested)
      })
    }
  }

  // FORCE TO HIDE
  public forceHide() {
    this.setState({ open: false })
    setTimeout(() => {
      this.setState({ ...defState })
    }, 300)
  }

  // CONFIRM
  private confirm() {
    if (this.state.onConfirm) this.state.onConfirm()
    this.hide()
  }

  // COMPONENT
  render() {
    return (
      <div
        onClick={this.state.type === 'window' ? this.hide : undefined}
        style={
          this.state.open
            ? {
                ...Styles.alertContainer,
                ...Styles.openAlert,
                backdropFilter: this.props.blurred ? 'blur(3px)' : 'none',
                zIndex: this.props.zIndex || 100
              }
            : {
                ...Styles.alertContainer,
                ...Styles.closeAlert,
                backdropFilter: this.props.blurred ? 'blur(3px)' : 'none',
                zIndex: this.props.zIndex || 100
              }
        }
      >
        <div
          style={
            this.state.open
              ? {
                  ...Styles.alertContent,
                  ...Styles.openContent
                }
              : {
                  ...Styles.alertContent,
                  ...Styles.closeContent
                }
          }
        >
          {this.state.type !== 'alert' && (
            <h1 style={Styles.alertContentH1}>{this.state.title}</h1>
          )}
          <p
            style={{
              ...Styles.alertContentP,
              fontSize: this.state.type === 'alert' ? '1.2em' : '1em'
            }}
          >
            {this.state.body}
          </p>
          {this.state.customElements}

          {this.state.type !== 'window' && (
            <ul style={Styles.alertActions}>
              {!this.state.fixed && this.state.type === 'confirm' && (
                <li>
                  {!this.state.cancelBtn ? (
                    <button onClick={this.hide} style={Styles.cancelBtn}>
                      {this.state.cancelText ||
                        this.props.cancelText ||
                        'Cancel'}
                    </button>
                  ) : (
                    <div onClick={this.hide}>{this.state.cancelBtn}</div>
                  )}
                </li>
              )}
              <li>
                {!this.state.confirmBtn ? (
                  <button
                    style={{
                      ...Styles.alertActionsLiButton,
                      background:
                        this.state.type === 'error'
                          ? this.props.errColor || '#ff5252'
                          : this.props.confirmColor || '#2196f3'
                    }}
                    onClick={this.confirm}
                  >
                    {' '}
                    {this.state.confirmText ||
                      this.props.confirmText ||
                      'Accept'}
                  </button>
                ) : (
                  <div onClick={this.confirm}>{this.state.confirmBtn}</div>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>
    )
  }
}

// GENERAL HOC
const withAlerts = (Component: React.FC<any>, props?: HOCProps) => {
  // EMPTY ALERTS
  const emptyAlert = () => null

  // COMPONENT
  const withAlertsComponent: React.FC = () => {
    return (
      // eslint-disable-next-line react/jsx-fragments
      <React.Fragment>
        <Component />
        <AlertTemplate
          {...props}
          ref={(AlertRef) => {
            window.Alert = AlertRef?.show || emptyAlert
            window.hideAlert = AlertRef?.forceHide || emptyAlert
          }}
        />
      </React.Fragment>
    )
  }

  // RENDER
  return withAlertsComponent
}

export default withAlerts

// TYPESCRIPT GLOBAL DEFINITIONS
declare global {
  interface Window {
    Alert: (props: AlertProps | string) => any
    hideAlert: () => any
  }
}
