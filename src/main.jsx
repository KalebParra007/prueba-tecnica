import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { enrutador } from './router/routes'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(enrutador)}/>
  </StrictMode>,
)
