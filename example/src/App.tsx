import React from 'react'

import Provider from './Prov'

const App = () => {
  return (
    <div>
      <Provider text='hello'>
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
      </Provider>
    </div>
  )
}

export default App
