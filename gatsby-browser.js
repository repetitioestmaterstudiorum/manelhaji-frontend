import React from "react"

import { PersistantDataProvider } from "./src/context/persistantDataContext"

export const wrapRootElement = ({ element }) => (
  <PersistantDataProvider>{element}</PersistantDataProvider>
)
