import { useState } from 'react';
import { useSession } from "../context/sessionContext";
import { /* useNavigate, */ Link } from 'react-router-dom';
import LoginButton from './auth/LoginButton';
import { BellIcon, MessageIcon } from './Icons';
import NotificationsPanel from './NotificationsPanel';
import LogoutButton from './auth/LogoutButton';
import RegisterButton from './register/RegisterButton';
import MenuUser from './MenuUser';

const NavBar = () => {
  const { user, updateUser, updateUnreadMessages, notifications, updateNotifications, msgs, isAuthenticated, identity, backend } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [name, setName] = useState("")
  // const navigate = useNavigate();

  const handleClickBell = () => {
    setShowNotifications(!showNotifications);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRegister = async () => {
    if (name.length < 3 || name.length > 30) { return }
    const registerResult = await backend.signUp({ name: name.trim() });

    if ("Ok" in registerResult) {
      setShowModalRegister(false);
      updateUser(registerResult.Ok.user)
      updateNotifications(registerResult.Ok.notifications)
      updateUnreadMessages(registerResult.Ok.msgs)
      setName("");
    }
  }

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-x-2 min-w-[120px] sm:min-w-[180px]">
          {/* Placeholder SVG logo */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#22c55e" />
            <text x="16" y="21" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">MT</text>
          </svg>
          <span className="text-lg sm:text-xl font-bold text-gray-800 whitespace-nowrap">Micro Tareas</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigation Links - Desktop */}
        <nav className="hidden sm:flex items-center gap-x-8">
          <Link
            to="/tasks"
            className="text-gray-600 hover:text-green-600 transition-colors font-medium"
          >
            Browse Tasks
          </Link>
          <Link
            to="/hire"
            className="text-gray-600 hover:text-green-600 transition-colors font-medium"
          >
            Hire Freelancer
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="hidden sm:flex items-center gap-x-4 min-w-[120px] justify-end">
          {!isAuthenticated ? (
            <LoginButton />
          ) : user ? (
            <>
              <div className='flex items-center'>
                <MessageIcon qty={msgs.length} />
                <BellIcon
                  onClick={handleClickBell}
                  qty={notifications.filter(n => !n.read).length}
                  className='mr-4 '
                />
              </div>
              {showNotifications && (
                <NotificationsPanel onClose={() => setShowNotifications(false)} />
              )}
              <MenuUser />
            </>
          ) : (
            <>
              <RegisterButton
                onClick={() => setShowModalRegister(!showModalRegister)}
                className='absolute top-[60px] left-1/2 transform -translate-x-1/2 mt-2 z-10'
              />
              <LogoutButton />
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-lg sm:hidden">
            <nav className="flex flex-col p-4 space-y-4">
              <Link
                to="/tasks"
                className="text-gray-600 hover:text-green-600 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Jobs
              </Link>
              <Link
                to="/hire"
                className="text-gray-600 hover:text-green-600 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hire Freelancer
              </Link>
              {!isAuthenticated ? (
                <LoginButton />
              ) : user ? (
                <>
                  <div className='flex items-center justify-between'>
                    <MessageIcon qty={msgs.length} className='fill-gray-800' />
                    <BellIcon
                      className='fill-gray-800'
                      onClick={handleClickBell}
                      qty={notifications.filter(n => !n.read).length}
                    />
                  </div>
                  {showNotifications && (
                    <NotificationsPanel onClose={() => setShowNotifications(false)} />
                  )}
                  <MenuUser />
                </>
              ) : (
                <>
                  <RegisterButton
                    onClick={() => setShowModalRegister(!showModalRegister)}
                    className='absolute top-[60px] left-1/2 transform -translate-x-1/2 mt-2 z-10'
                  />
                  <LogoutButton />
                </>
              )}
            </nav>
            {showModalRegister && <div>hola</div>}
          </div>
        )}
      </div>

      {/* Aca empieza el modal registry */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-1000 
          ${showModalRegister ? 'opacity-95 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowModalRegister(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white text-black p-3 rounded-[40px] transform transition-all duration-1000
              ${showModalRegister ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        >
          <h2 className="font-semibold text-lg mb-2 text-center">Register User</h2>
          <p className="text-sm mb-2">Principal ID: {identity.getPrincipal().toString()}</p>
          <input
            type="text"
            required
            maxLength={35}
            placeholder="Name"
            value={name}
            onChange={handleChangeName}
            className="border p-2 w-full mb-2 rounded-full text-center"
          />


          <div className="text-sm flex items-center space-x-2">
            {name.length === 0 ? (
              <span className="text-gray-500">Must be between 3 and 30 characters</span>
            ) : name.length < 3 || name.length > 30 ? (
              <>
                <span className="text-red-600">❌ Must be between 3 and 30 characters</span>
              </>
            ) : (
              <>
                <span className="text-green-600">✅ Nombre válido</span>
              </>
            )}
          </div>
          <input
            type="text"
            required
            maxLength={10}

            className="ml-20 border p-2 w-[70%] mt-3 mb-3 rounded-full text-center appearance-none [-moz-appearance:_textfield] 
                [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
          />

          <div className="flex justify-between px-[30px]">
            <button
              style={{ backgroundColor: "#555555" }}
              className="button w-[110px]"
              onClick={() => setShowModalRegister(false)}
            >
              Close
            </button>
            <button
              className="button w-[110px]"
              onClick={handleRegister}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;