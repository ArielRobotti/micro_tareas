import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { HttpAgent, Identity, AnonymousIdentity, ActorSubclass } from '@dfinity/agent';
import { User, Notification, Msg, _SERVICE } from '../declarations/backend/backend.did';
import { createActor } from "../declarations/backend";
import { AuthClient } from '@dfinity/auth-client';
import ModalProviderSelect from '../components/auth/ModalProviderSelect';

const canisterId = import.meta.env.VITE_CANISTER_ID_BACKEND as string
const host = import.meta.env.VITE_DFX_NETWORK === "local" ? "http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai" : "https://identity.ic0.app";

type SessionContextType = {
  user: User | null;
  notifications: Notification[];
  msgs: Msg[];
  identity: Identity;
  isAuthenticated: boolean;
  loading: boolean;
  backend: ActorSubclass<_SERVICE>;
  login: () => void;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  updateNotifications: (notifications: Notification[]) => void;
  updateUnreadMessages: (messagesPrev: Msg[]) => void;
  
};

const defaultSessionContext: SessionContextType = {
  user: null,
  notifications: [],
  msgs: [],
  identity: new AnonymousIdentity(),
  isAuthenticated: false,
  loading: false,
  backend: createActor(canisterId, {
    agentOptions: { identity: new AnonymousIdentity(), host }
  }),
  login: () => { },
  logout: async () => { },
  updateUser: () => {},
  updateNotifications: () =>{ },
  updateUnreadMessages: () => {},
};

export const SessionContext = createContext<SessionContextType>(defaultSessionContext);

type SessionProviderProps = {
  children: ReactNode;
};

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState<Identity>(new AnonymousIdentity());
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  
  const [backend, setBackend] = useState<ActorSubclass<_SERVICE>>(
    createActor(canisterId, {
      agentOptions: { identity: new AnonymousIdentity(), host }
    })
  );
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const setupAgent = async () => {
      const agent = await HttpAgent.create({
        identity,
        host,
      });
      setBackend(createActor(canisterId, { agent }));

    };
    setupAgent();
  }, [identity]);


  useEffect(() => {
    const getUser = async () => {
      const response = await backend.signIn()
      if ("Ok" in response) {
        setUser(response.Ok.user);
        setNotifications(response.Ok.notifications);
        setMsgs(response.Ok.msgs);
      }
    }
    if(isAuthenticated) {
      getUser()
    } else {
      setUser(null);
      setNotifications([]);
      setMsgs([])
    }
  }, [isAuthenticated, backend]);
  

  async function init() {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    setIdentity(identity);

    setIsAuthenticated(!identity.getPrincipal().isAnonymous());
    setLoading(false);
  };

  const updateUser = (user: User) => {
    setUser(user);
  };

  const updateNotifications = (updatedNotifications: Notification[]) => {
    setNotifications(updatedNotifications);
  };

  const updateUnreadMessages = (updatedMessages: Msg[]) => {
    setMsgs(updatedMessages)
  };

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const login = async (providerUrl: string) => {
    const authClient = await AuthClient.create();
    await authClient.login({
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      identityProvider: providerUrl,
      onSuccess: () => {
        const identity = authClient.getIdentity();
        setIdentity(identity);
        setIsAuthenticated(true);
      },
      onError: (err) => console.error("Error al iniciar sesión:", err),
    });
  };

  const handleProviderSelection = async (providerUrl: string) => {
    setIsModalOpen(false);
    await login(providerUrl);
  };

  const logout = async () => {
    setUser(null);
    const authClient = await AuthClient.create();
    await authClient.logout();
    setIdentity(new AnonymousIdentity());
    setIsAuthenticated(false);
    setBackend(
      createActor(canisterId, {
        agentOptions: { identity: new AnonymousIdentity(), host }
      })
    );
  };

  return (
    <SessionContext.Provider value={
      { 
        user, notifications, msgs, identity, backend, isAuthenticated, loading, updateUser, updateNotifications, updateUnreadMessages,
        login: handleLoginClick, logout }
      }
    >
      {children}
      <ModalProviderSelect
        internetIdentityUrl= {host}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectProvider={handleProviderSelection}
      />
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
