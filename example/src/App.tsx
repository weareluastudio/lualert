import React from 'react'

import withAlerts from 'lualert'

const App = () => {
  return (
    <button
      onClick={() =>
        window.Alert({
          title: 'Test',
          body: 'test',
          type: 'confirm'
        })
      }
    >
      Show
    </button>
  )
}

export default withAlerts(App)
