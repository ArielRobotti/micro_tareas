import { SessionProvider } from "./context/sessionContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import {Dashboard, Feed, Home} from "./pages";
import './App.css';

function App() {
  return (
    <div className="min-h-[200vh]">

    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SessionProvider>
    </div>
  );
}

export default App;
