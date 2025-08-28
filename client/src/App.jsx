import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'

export default function App(){
  const [theme,setTheme]=useState(()=> localStorage.getItem('theme') || 'light')
  useEffect(()=>{
    const root=document.documentElement
    theme==='dark'? root.classList.add('dark'): root.classList.remove('dark')
    localStorage.setItem('theme',theme)
  },[theme])

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-right" />
        <div className="flex-1">
          <RouterProvider router={routes(setTheme, theme)} />
        </div>
        <footer className="py-6 text-xs text-center opacity-60">
          FlowGrid Make today count ✨
        </footer>
      </div>
    </AuthProvider>
  )
}
