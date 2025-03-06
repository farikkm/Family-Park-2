import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "@/views/Home"
import Catalog from "@/views/Catalog"
import Market from "@/views/Market"
import Events from "@/views/Events"
import Cinema from "@/views/Cinema"
import HR from "./views/HR"
import Tenant from "./views/Tenant"
import LostItem from "./views/LostItem"
import Map from "./views/Map"

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/map" element={<Map />}></Route>
          <Route path="/catalog" element={<Catalog />}></Route>
          <Route path="/market" element={<Market />}></Route>
          <Route path="/events" element={<Events />}></Route>
          <Route path="/cinema" element={<Cinema />}></Route>
          <Route path="/hr" element={<HR />}></Route>
          <Route path="/tenant" element={<Tenant />}></Route>
          <Route path="/lost-item" element={<LostItem />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
