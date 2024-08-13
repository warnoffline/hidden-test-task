import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/app-router'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './styles/main.css';
import { Provider } from 'react-redux'
import { setupStore } from './store/store'

const store = setupStore();

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </Provider>
)
  