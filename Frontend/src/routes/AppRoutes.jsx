import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthPage from '../pages/AuthPage'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/user/register"
          element={<AuthPage audience="user" mode="register" />}
        />
        <Route
          path="/user/login"
          element={<AuthPage audience="user" mode="login" />}
        />
        <Route
          path="/food-partner/register"
          element={<AuthPage audience="partner" mode="register" />}
        />
        <Route
          path="/food-partner/login"
          element={<AuthPage audience="partner" mode="login" />}
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes