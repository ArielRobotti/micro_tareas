import { SessionProvider } from "./context/sessionContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Dashboard, Feed, Home, BrowseTasks, HireFreelancer, TaskDetail } from "./pages";
import './App.css';

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<BrowseTasks />} />
              <Route path="/tasks/:id" element={<TaskDetail />} />
              <Route path="/hire" element={<HireFreelancer />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </div>
  );
}

export default App;
