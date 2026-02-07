import { createRoot } from 'react-dom/client'
import { ConfigProvider } from './context/ConfigContext'
import { loadConfig } from './lib/configIO'
import App from './App.jsx'
import './index.css'

const config = loadConfig()

createRoot(document.getElementById('root')).render(
  <ConfigProvider config={config}>
    <App />
  </ConfigProvider>
)
