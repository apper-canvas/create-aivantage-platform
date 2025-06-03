import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
<div className="min-h-screen bg-gradient-to-br from-surface-50 via-surface-100 to-blue-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-50"
        toastClassName="bg-white shadow-soft border border-surface-200"
        bodyClassName="text-surface-800 font-medium"
        progressClassName="bg-gradient-to-r from-primary to-secondary"
      />
    </div>
  )
}

export default App