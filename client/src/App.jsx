import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'

export default function App(){
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-right" />
        <div className="flex-1">
          <RouterProvider router={routes()} />
        </div>
        <footer className="py-6 text-xs text-center text-neutral-300">
          FlowGrid — Make today count ✨
        </footer>
      </div>
    </AuthProvider>
  )
}
