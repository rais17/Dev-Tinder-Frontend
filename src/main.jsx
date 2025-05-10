import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from './store/appStore.js'
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Something Went Wrong</div>}>
      <Provider store={appStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
