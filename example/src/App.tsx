import React from 'react'

import withAlerts from 'lualert'

const App = () => {
  return <button onClick={() => window.Alert('Hello world')}>Show</button>
}

export default withAlerts(App)
