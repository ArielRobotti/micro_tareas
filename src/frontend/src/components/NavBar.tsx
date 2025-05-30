import { useState } from 'react';
import { useSession } from "../context/sessionContext";
import { useNavigate, Link } from 'react-router-dom';
import LoginButton from './auth/LoginButton';
import { BellIcon, MessageIcon } from './Icons';
import NotificationsPanel from './NotificationsPanel';
import LogoutButton from './auth/LogoutButton';
import MenuUser from './MenuUser';

const NavBar = () => {
  const { user, notifications, msgs, isAuthenticated } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickBell = () => {
    setShowNotifications(!showNotifications);
  };

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
            to="/jobs"
            className="text-gray-600 hover:text-green-600 transition-colors font-medium"
          >
            Browse Jobs
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
                <MessageIcon qty={msgs.length} className="ml-2" />
                <BellIcon
                  onClick={handleClickBell}
                  qty={notifications.filter(n => !n.read).length}
                  className='mr-4'
                />
              </div>
              {showNotifications && (
                <NotificationsPanel onClose={() => setShowNotifications(false)} />
              )}
              <MenuUser />
            </>
          ) : (
            <LogoutButton />
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-lg sm:hidden">
            <nav className="flex flex-col p-4 space-y-4">
              <Link
                to="/jobs"
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
                    <MessageIcon qty={msgs.length} />
                    <BellIcon
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
                <LogoutButton />
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;