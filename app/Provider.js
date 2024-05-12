'use client'

import { Provider as ReduxProvider } from "react-redux";
import store from "@/store/store";

const CustomProvider = ({ children }) => {
  return (
    <ReduxProvider store={store}>
        {children}
    </ReduxProvider>
  )
}

export default CustomProvider;