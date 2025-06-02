import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/sessionContext";

const MenuUser = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModalVerify, setShowModalVerify] = useState(false);
  const [code, setCode] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { logout, user, backend } = useSession();

  const handleGetCode = async () => {
    const code = await backend.getVerificationCode();
    console.log(Number(code))
    setShowModalVerify(false);
  }

  const handleVerify = async () => {
    console.log(code)
    const response = await backend.enterCodeVerification(BigInt(code))
    if (response) {
      alert("Your email has been verified successfully")
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="m-[2px] z-70 relative">

      <div
        className="relative text-black mr-[10px] h-[35px] w-[35px] bg-gradient-to-b from-[#ffffff] to-[#2222aa] rounded-full flex items-center justify-center cursor-pointer"
        ref={menuRef}
        onClick={() => { setShowMenu(!showMenu) }}
      >
        <span className="select-none">
          {user?.name.split(" ").slice(0, 2).map(n => n[0].toUpperCase()).join(" ")}
        </span>
      </div>


      <div
        className={`absolute top-[5px] right-[2px] w-48 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg shadow-xl transition-transform duration-300 origin-top transform
            ${showMenu ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
      >
        <div onMouseDown={() => navigate(`/users/${user?.principal}`)} className="flex items-center justify-between py-1 hover:bg-gray-500 hover:rounded-t-lg">
          <span className="block w-full text-left px-4 py-2">Profile {user?.name.split(" ")[0]}</span>
        </div>

        {!user?.verified && (
          <div onMouseDown={() => setShowModalVerify(true)} className="flex items-center justify-between py-1 hover:bg-gray-500 hover:rounded-t-lg">
            <span className="block w-full text-left px-4 py-2">Verify Profile</span>
          </div>
        )}

        <div onMouseDown={() => navigate("/dashboard")} className="flex items-center justify-between py-1 hover:bg-gray-500">
          <span className="block w-full text-left px-4 py-2">My tasks</span>
        </div>

        <hr className="border-gray-500" />

        <div onMouseDown={logout}>
          <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-500 hover:rounded-b-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 text-white" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20 3v18H8v-1h11V4H8V3h12zm-8.9 12.1.7.7 4.4-4.4L11.8 7l-.7.7 3.1 3.1H3v1h11.3l-3.2 3.3z"></path>
            </svg>
            <span className="block w-full text-left text-white px-4 py-2">Log out</span>
          </div>
        </div>
      </div>

      {/* MODAL DE VERIFICACION */}
      {showModalVerify && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          onClick={() => setShowModalVerify(false)} // click en fondo cierra el modal
        >
          <div
            className="relative bg-white p-6 rounded-lg shadow-xl text-black max-w-sm w-full"
            onClick={(e) => e.stopPropagation()} // evita que el click dentro del modal lo cierre
          >
            {/* Botón X en la esquina */}
            <h1
              className="h-10 absolute top-0 right-4 text-gray-500 hover:text-gray-700 "
              onClick={() => setShowModalVerify(false)}
            >
              ×
            </h1>

            <h2 className="text-lg font-semibold mb-4">Send me a code of verification</h2>

            <div className="flex flex-row gap-4 justify-center">
              <div
                className="mt-4 w-30 px-4 py-2 text-white rounded-full bg-blue-600 hover:bg-blue-500 text-center cursor-pointer"
                onClick={handleGetCode}
              >
                Get Code
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-4">
              <input
                onChange={(e) => setCode(Number(e.target.value))}
                className="h-10 w-48 border rounded-full px-4 text-center [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                placeholder="Enter Code"
              />
              <div
                className="px-4 py-2 text-white rounded-full bg-blue-600 hover:bg-blue-500 text-center cursor-pointer"
                onClick={handleVerify}
              >
                Verify
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuUser;
