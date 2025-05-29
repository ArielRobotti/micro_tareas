import { /* useEffect */ useState } from 'react';
import { useSession } from "../context/sessionContext";
import { useNavigate } from 'react-router-dom';
import LoginButton from './auth/LoginButton';
import { BellIcon, HomeIcon, MessageIcon } from './Icons';
import RegisterButton from './register/RegisterButton';
import NotificationsPanel from './NotificationsPanel';
import LogoutButton from './auth/LogoutButton';
import MenuUser from './MenuUser';



const NavBar = () => {

  const { user, notifications, msgs, isAuthenticated, /* backend, updateUser, updateNotifications, updateMsgs */ } = useSession();
  // const [name, setName] = useState("");
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();



  // const handleRegister = async () => {
  //   if (name.length < 3 || name.length > 30) { return }
  //   const registerResult = await backend.signUp({ name: name.trim() });

  //   if ("Ok" in registerResult) {
  //     updateUser(registerResult.Ok.user)
  //     setShowModalRegister(false);
  //     setName("");
  //   }
  // }

  const handleClickBell = () => {
    setShowNotifications(!showNotifications)
  };


  return (
    <>
      <header className="w-[100vw] flex justify-between items-center p-1 bg-gradient-to-t from-[#00000000] to-green-800 pb-4 text-white select-none h-[60px]">


      <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1
            onClick={() => navigate("./")}
            className="hidden sm:block text-[34px] font-bold cursor-pointer "
          >
            Micro Tareas
          </h1>
          <HomeIcon
            onClick={() => navigate("./")}
            className="block sm:hidden text-2xl cursor-pointer"
          />
        </div>
        
        {!isAuthenticated ? (
          <LoginButton />
        ) : user ? (
          <>
            <div className='flex items-center'>
              <MessageIcon qty={msgs.length} className="ml-2" />
              <BellIcon onClick={handleClickBell} qty={notifications.filter(n => !n.read).length} className='mr-4' />
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
      </header>
    </>
  )
}

export default NavBar