import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { AdminProvider } from './context/adminContext.tsx'
import { MemberProvider } from './context/memberContext.tsx'
import { CommentProvider } from './context/commentContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CommentProvider>
      <AuthProvider>
          <AdminProvider>
              <MemberProvider>
                <App />
              </MemberProvider>
          </AdminProvider>
      </AuthProvider>
    </CommentProvider>
  </StrictMode>,
)
