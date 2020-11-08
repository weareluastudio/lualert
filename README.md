<div align="center">
<img src='https://blog.wearelua.com/images/icons/icon-logo-512px.png' title='LUA Logo' height='70' />
<h1>LUADevStudio® | LUAlert</h1>
<img src='https://img.shields.io/npm/v/@weareluastudio/lualert?style=for-the-badge' title='NPM Version'/>

<img src='https://img.shields.io/badge/LUABuild-component-green?style=for-the-badge' title='NPM Version'/>

<img src='https://img.shields.io/badge/PoweredBy-LUADevStudio-blue?style=for-the-badge' title='NPM Version'/>

<p>
LUAlert is a typescript react js component for displaying customizable alerts with a global API. LUAlert is an alert made with zero dependencies.</p>
</div>

[SEE A DEMO HERE](https://codesandbox.io/s/elastic-swartz-qslk5?fontsize=14&hidenavigation=1&theme=dark)

## Install

```bash
npm install --save @weareluastudio/lualert
```

## Usage

```tsx
import React from 'react'
import withAlerts from '@weareluastudio/lualert'

const App = () => {
  // ALERT
  const showAlert = () => window.Alert('Hello world')

  return <button onClick={showAlert}>Show</button>
}

// ALERT HOC
export default withAlerts(App)
```

## withAlerts() Props

You can define some properties for all alerts in your application, such as color, text, and effects. For example with the hoc:

**IMPORTANT: you need only one withAlerts() in your project. As a recommendation put it in the App component.**

```tsx
// ALERT HOC
export default withAlerts(App)
```

```tsx
// ALERT HOC WITH GLOBAL PROPS
export default withAlerts(App, { ...props })
```

| Name         | Type    | Description                                                        | Default | Optional |
| ------------ | ------- | ------------------------------------------------------------------ | ------- | -------- |
| confirmColor | string  | The background color for "Accept" button.                          | #2196f3 | true     |
| confirmText  | string  | The label for "Accept" button.                                     | Accept  | true     |
| cancelText   | string  | The label for "Cancel" button.                                     | Cancel  | true     |
| errColor     | string  | The background color for "Accept" button on alert with error type. | #ff5252 | true     |
| blurred      | boolean | (Experimental) define the background effect on alerts.             | false   | true     |

## Alert props

You can define custom alerts with titles, texts, buttons and reactjs components within the alert, you can also define the interaction with the user. For example, this custom alert:

```tsx
window.Alert({
  title: 'My alert title',
  body: 'My alert plain text',
  type: 'confirm'
})
```

Or with custom react elements:

```tsx
window.Alert({
  title: 'My alert title',
  body: 'My alert plain text',
  type: 'confirm',
  customElements: <MyComponent>
})
```

Nested alerts

```tsx
window.Alert({
  title: 'Test1',
  body: 'Test1',
  type: 'confirm',
  nested: 'Test2'
})
```

```tsx
window.Alert({
  title: 'Test1',
  body: 'Test1',
  type: 'confirm',

  nested: {
    title: 'Test2',
    body: 'Test2',
    type: 'confirm',

    nested: {
      title: 'Test3',
      body: 'Test3',
      type: 'confirm'
    }
  }
})
```

| Name           | Type                                        | Description                                                       | Default  | Optional |
| -------------- | ------------------------------------------- | ----------------------------------------------------------------- | -------- | -------- |
| type           | 'confirm' \| 'window' \| 'alert' \| 'error' | Define the alert style and interaction.                           | 'alert'  | false    |
| title          | string                                      | Title of the alert.                                               | ''       | false    |
| body           | string                                      | Alert content in text plain.                                      | ''       | false    |
| onConfirm      | method                                      | Dispatch onConfirm method when Accept button is pressed.          | void     | true     |
| onHide         | method                                      | This method its always called when the Alert is closed.           | void     | true     |
| fixed          | boolean                                     | If you set true, the alert never close on some conditions.        | false    | true     |
| customElements | JSX.Element                                 | Wraps a custom elements or nested elements inside the alert body. | null     | true     |
| confirmText    | string                                      | Replace the "Accept" label for the current instance.              | "Accept" | true     |
| confirmBtn     | JSX.ELement                                 | Replace the whole "Accept" button for the current instance.       | null     | true     |
| cancelText     | string                                      | Replace the "Cancel" label for the current instance.              | "Cancel" | true     |
| cancelBtn      | JSX.Element                                 | Replace the whole "Cancel" button for the current instance.       | null     | true     |
| nested         | AlertProps \| string                        | Show an alert after the current hides                             | null     | true     |

## Global API

LUAlert has a global api that is exposed to the window object, which allows controlling the life cycle of an alert.

| Name               | Param types          | Description                             | Default | Example               |
| ------------------ | -------------------- | --------------------------------------- | ------- | --------------------- |
| window.Alert()     | string \| AlertProps | Dispatch a new alert in app.            | void    | window.Alert('Hello') |
| window.hideAlert() | NO PARAMS            | Force close the alert (not recommended) | void    | window.hideAlert()    |

## License

MIT © [weareluastudio](https://github.com/weareluastudio)
