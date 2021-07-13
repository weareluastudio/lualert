import React from 'react'
import withAlerts from 'lualert'

const Provider: React.FC<{ text: string }> = ({ children, text }) => {
  return (
    <div>
      {children}
      {text}
    </div>
  )
}

export default withAlerts<{ text: string }>()(Provider)
