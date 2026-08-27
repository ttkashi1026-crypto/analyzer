import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        `${import.meta.env.BASE_URL}sw.js`,
      )
      await registration.update()
    } catch (error) {
      console.error('最新版の確認に失敗しました', error)
    }
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
