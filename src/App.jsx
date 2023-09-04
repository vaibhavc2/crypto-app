import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import Coins from "./components/Coins"
import Exchanges from "./components/Exchanges"
import CoinDetails from "./components/CoinDetails"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/exchange" element={<Exchanges />} />
        <Route path="/coins/:id" element={<CoinDetails />} />
      </Routes>
    </Router>
  )
}

export default App
