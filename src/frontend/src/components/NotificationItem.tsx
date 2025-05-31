import { Notification } from '../declarations/backend/backend.did';
interface Props {
  notif: Notification;
  onClick?: () => void;
}

const NotificationItem = ({ notif }: Props) => {

  return (
    <div
      onClick={() => {}}
      className={`px-4 py-3 border-b last:border-b-0 last:rounded-b-lg cursor-pointer ${
        notif.read
          ? 'bg-gray-500 hover:bg-gray-700'
          : 'bg-gray-800 hover:bg-gray-900'
      }`}
    >
      <div className="text-[11px] text-right text-gray-300">
        {new Date(Number(notif.date) / 1000000).toLocaleString()}
      </div>
      <p className='text-[16px]'>{notif.title}</p>
      <p className='text-[16px]'>{notif.content}</p>
    </div>
  );
};

export default NotificationItem;
