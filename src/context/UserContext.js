/* NPM modules */
import React from 'react'
/* Material UI */
/* Own modules */
/* Assets */
/* CSS */

const UserContext = React.createContext()

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
export default UserContext