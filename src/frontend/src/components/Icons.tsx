import React from "react";

type IconProps = {
  className?: string;
  onClick?: () => void;
};
export const BugerMenuIcon: React.FC<IconProps> = ({ className = "", onClick }) => {

  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`w-8 h-9 text-gray-700 cursor-pointer fill-[#dedede] ${className}`}
      aria-hidden="true"
    >
      <rect x="4" y="6" width="16" height="2" rx="1.5" />
      <rect x="4" y="11" width="16" height="2" rx="1.5" />
      <rect x="4" y="16" width="16" height="2" rx="1.5" />
    </svg>
  );
};

export const HomeIcon: React.FC<IconProps> = ({ className = "", onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`w-8 h-8 text-gray-700 cursor-pointer ${className}`}
      // fill="#dedede"
      aria-hidden="true"
    >
      <path d="M12 3L3 10v1h2v8h5v-6h4v6h5v-8h2v-1L12 3z" />
    </svg>
  );
};

export const BellIcon: React.FC<IconProps & { qty: number }> = ({ className = "", qty = 0, onClick }) => (
  <div className={`relative w-9 h-8 ml-4 ${className}`} onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 28"
      className={`w-9 h-9 text-gray-700 cursor-pointer  fill="#dedede ${className}`}
      //"
      aria-hidden="true"
    >
      <path d="M12 2C10.343 2 9 3.343 9 5v1.068C6.165 7.2 4.5 9.828 4.5 13v3l-1.5 1.5v1h18v-1L19.5 16v-3c0-3.172-1.665-5.8-4.5-6.932V5c0-1.657-1.343-3-3-3zm0 20c1.104 0 2-.896 2-2h-4c0 1.104.896 2 2 2z" />
    </svg>

    {qty > 0 && (
      <div className="absolute top-6 left-5 bg-red-600 text-white text-xs font-bold min-w-4 h-4 p-[2px] flex items-center justify-center rounded-full">
        {qty}
      </div>
    )}
  </div>
);

export const MessageIcon: React.FC<IconProps & { qty: number }> = ({ className = "", onClick, qty }) => (
  <div className={`relative w-9 h-8 ml-4 ${className}`} onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-8 h-8 cursor-pointer className='fill-gray-800' ${className}`}
      viewBox="0 0 24 24"
    >
      <g data-name="Layer 2">
        <g data-name="message-circle">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="16" cy="12" r="1"></circle>
          <circle cx="8" cy="12" r="1"></circle>
          <path d="M19.07 4.93a10 10 0 0 0-16.28 11 1.06 1.06 0 0 1 .09.64L2 20.8a1 1 0 0 0 .27.91A1 1 0 0 0 3 22h.2l4.28-.86a1.26 1.26 0 0 1 .64.09 10 10 0 0 0 11-16.28zm.83 8.36a8 8 0 0 1-11 6.08 3.26 3.26 0 0 0-1.25-.26 3.43 3.43 0 0 0-.56.05l-2.82.57.57-2.82a3.09 3.09 0 0 0-.21-1.81 8 8 0 0 1 6.08-11 8 8 0 0 1 9.19 9.19z"></path>
          <rect width="24" height="24" opacity="0"></rect>
        </g>
      </g>
    </svg>
    {qty > 0 && (
      <div className="absolute top-6 left-3 bg-red-600 text-white text-xs font-bold p-[2px] min-w-4 h-4 flex items-center justify-center rounded-full">
        {qty}
      </div>
    )}
  </div>
);

export const MetricsIcon: React.FC<IconProps> = ({ className = "", onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-8 h-8 cursor-pointer ${className}`}
  >
    <path d="M2.75 4.75V16.25C2.75 17.9069 4.09315 19.25 5.75 19.25H21.25M6.75 15.25L10 12C10.5523 11.4477 11.4477 11.4477 12 12V12C12.5523 12.5523 13.4477 12.5523 14 12L19.25 6.75M19.25 6.75H14.75M19.25 6.75V11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    {/* <path d="M3 18v-5h3v5H7z" />
    <path d="M7 18v-11h3v11h-3z" />
    <path d="M11 18v-8h3v8h-3z" />
    <path d="M15 18v-15h3v15h-3z" /> */}
  </svg>
);


export const GithubIcon: React.FC<IconProps> = ({ className = "", onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className={`w-6 h-6 cursor-pointer fill-[#dedede] ${className}`}
    viewBox="0 0 24 24"
    width="32"
    height="32"
    aria-hidden="true"
    role="img"
  >
    <path d="M12 1C5.9225 1 1 5.9225 1 12C1 16.8675 4.14875 20.9787 8.52125 22.4362C9.07125 22.5325 9.2775 22.2025 9.2775 21.9137C9.2775 21.6525 9.26375 20.7862 9.26375 19.865C6.5 20.3737 5.785 19.1912 5.565 18.5725C5.44125 18.2562 4.905 17.28 4.4375 17.0187C4.0525 16.8125 3.5025 16.3037 4.42375 16.29C5.29 16.2762 5.90875 17.0875 6.115 17.4175C7.105 19.0812 8.68625 18.6137 9.31875 18.325C9.415 17.61 9.70375 17.1287 10.02 16.8537C7.5725 16.5787 5.015 15.63 5.015 11.4225C5.015 10.2262 5.44125 9.23625 6.1425 8.46625C6.0325 8.19125 5.6475 7.06375 6.2525 5.55125C6.2525 5.55125 7.17375 5.2625 9.2775 6.67875C10.1575 6.43125 11.0925 6.3075 12.0275 6.3075C12.9625 6.3075 13.8975 6.43125 14.7775 6.67875C16.8813 5.24875 17.8025 5.55125 17.8025 5.55125C18.4075 7.06375 18.0225 8.19125 17.9125 8.46625C18.6138 9.23625 19.04 10.2125 19.04 11.4225C19.04 15.6437 16.4688 16.5787 14.0213 16.8537C14.42 17.1975 14.7638 17.8575 14.7638 18.8887C14.7638 20.36 14.75 21.5425 14.75 21.9137C14.75 22.2025 14.9563 22.5462 15.5063 22.4362C19.8513 20.9787 23 16.8537 23 12C23 5.9225 18.0775 1 12 1Z" />
  </svg>
);

export const GoogleIcon: React.FC<IconProps> = ({ className = "", onClick }) => (
  <svg  
  viewBox="0 0 24 24"
    onClick={onClick}
    className={`h-5 w-5 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    <path d="M1 1h22v22H1z" fill="none"/>
  </svg>
);

export const IntIdIcon: React.FC<IconProps> = ({className = "", onClick}) => (

  <svg xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 147 28"
    className={`w-8 h-8 cursor-pointer fill-[#dedede] ${className}`}
    onClick={onClick}
  >
    <g fill="currentColor">
      <title>Internet Identity</title>
      <path d="M65.561 1.08v11.632h3.134V1.08H65.56Zm8.761 4.725 4.037 6.907h3.15V1.08h-3.051v6.316L74.832 1.08h-3.544v11.632h3.035V5.805ZM89.58 3.984v8.728h-3.084V3.984H83.15V1.08h9.795v2.904H89.58Zm5.004-2.904v11.632h7.482v-2.707h-4.43v-1.87h4.004v-2.56h-4.003V3.738h4.396V1.08h-7.449Zm9.664 11.632V1.08h4.905c2.362 0 3.904 1.575 3.904 3.74 0 1.576-.87 2.741-2.149 3.25l2.199 4.642h-3.331l-1.837-4.216h-.64v4.216h-3.051Zm4.331-6.579c.92 0 1.395-.525 1.395-1.263 0-.738-.475-1.246-1.395-1.246H107.3v2.51h1.279Zm9.516-.328 4.036 6.907h3.149V1.08h-3.051v6.316l-3.625-6.316h-3.545v11.632h3.036V5.805Zm9.779 6.907V1.08h7.448v2.658h-4.396v1.837h4.003v2.56h-4.003v1.87h4.429v2.707h-7.481Zm15.656 0V3.984h3.364V1.08h-9.795v2.904h3.347v8.728h3.084Z"></path>
      <path d="M65.524 27.49h3.145V15.812h-3.145V27.49Zm8.822-3.014h1.12c1.466 0 2.734-.857 2.734-2.833 0-1.977-1.268-2.866-2.734-2.866h-1.12v5.699Zm1.136 3.014h-4.216V15.812h4.233c3.393 0 5.863 2.224 5.863 5.847 0 3.624-2.47 5.83-5.88 5.83Zm7.863 0h7.51v-2.718H86.41v-1.878h4.019v-2.569h-4.02V18.48h4.415v-2.668h-7.478V27.49Zm19.96 0h-3.162l-4.052-6.934v6.934h-3.047V15.812h3.558l3.64 6.341v-6.34h3.063V27.49Zm8.108-8.763h3.376v-2.915h-9.832v2.915h3.36v8.763h3.096v-8.763Zm8.164 8.763h-3.146V15.812h3.146V27.49Zm8.098-8.763h3.376v-2.915h-9.833v2.915h3.36v8.763h3.097v-8.763Zm3.865-2.915 3.837 6.901v4.777h3.13v-4.777l3.87-6.9h-3.425l-1.927 3.952-1.928-3.953h-3.557Z"></path>
    </g>
    <g fill="#00ACE5">
      <path d="M48.691 23.265c-4.047 0-8.322-2.646-10.42-4.567-2.293-2.1-8.596-8.936-8.624-8.967C25.514 5.118 19.957 0 14.412 0 7.734 0 1.91 4.624.395 10.751c.117-.403 2.238-6.016 10.208-6.016 4.048 0 8.322 2.646 10.42 4.567 2.293 2.1 8.596 8.936 8.624 8.967 4.133 4.612 9.69 9.73 15.235 9.73 6.678 0 12.502-4.624 14.017-10.751-.117.403-2.238 6.016-10.208 6.016Z"></path>
      <path fill="url(#logo-loop-bottom)" d="M29.647 18.27c-.014-.017-1.83-1.985-3.864-4.132-1.1 1.305-2.685 3.084-4.507 4.68-3.395 2.977-5.602 3.6-6.864 3.6-4.762 0-8.646-3.776-8.646-8.418 0-4.642 3.88-8.39 8.646-8.419.173 0 .382.018.636.063-1.432-.55-2.953-.909-4.445-.909-7.967 0-10.09 5.61-10.207 6.015A13.507 13.507 0 0 0 .001 14c0 7.72 6.368 14 14.309 14 3.31 0 7.018-1.697 10.838-5.044 1.805-1.582 3.37-3.275 4.546-4.636a2.261 2.261 0 0 1-.045-.05l-.002.001Z"></path>
      <path fill="url(#logo-loop-top)" d="M29.647 9.73c.015.016 1.83 1.985 3.864 4.132 1.1-1.305 2.685-3.084 4.507-4.68 3.395-2.977 5.602-3.6 6.864-3.6 4.762 0 8.646 3.776 8.646 8.418 0 4.616-3.88 8.39-8.646 8.419a3.67 3.67 0 0 1-.636-.063c1.432.55 2.954.909 4.445.909 7.967 0 10.09-5.61 10.207-6.015.258-1.044.395-2.132.395-3.249C59.294 6.281 52.823 0 44.883 0c-3.311 0-6.916 1.698-10.735 5.044C32.342 6.626 30.776 8.32 29.6 9.68l.045.05h.001Z"></path>
    </g>
    <defs>
      <linearGradient id="logo-loop-bottom" x1="21.883" x2="2.381" y1="26.169" y2="5.974" gradientUnits="userSpaceOnUse">
        <stop offset=".22" stopColor="#FF0079"></stop>
        <stop offset=".89" stopColor="#592489"></stop>
      </linearGradient>
      <linearGradient id="logo-loop-top" x1="37.398" x2="56.9" y1="1.844" y2="22.039" gradientUnits="userSpaceOnUse">
        <stop offset=".21" stopColor="#FF4B00"></stop>
        <stop offset=".68" stopColor="#FFAB00"></stop>
      </linearGradient>
    </defs>
  </svg>
);

export const BrokenEggIcon: React.FC<IconProps> = ({ className = "", onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={`w-8 h-8 text-gray-700 cursor-pointer ${className}`}
      fill="#dedede"
      aria-hidden="true"
    >
      <path d="M336 272c-13.3 0-24 10.7-24 24 0 6.2 2.4 11.9 6.2 16.2l-45.7 47.2-30.6-32 45.7-47.2c3.1 1.1 6.4 1.8 9.9 1.8 15.2 0 28-10.2 32-24H336zM256 0C167.6 0 96 114.6 96 240c0 52.2 19.7 99.6 52.2 136.1 16.1 17.9 34.8 32 55.2 41.9l42.7 83.8c2.7 5.3 8.1 8.3 13.6 8.3s10.9-3 13.6-8.3l42.7-83.8c20.4-9.9 39.1-24 55.2-41.9C396.3 339.6 416 292.2 416 240 416 114.6 344.4 0 256 0z" />
    </svg>
  );
};

export const YouTubeIcon: React.FC<IconProps> = ({ className = "", onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 20"
      className={`w-[40px] h-[20px] rounded-50 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <g>
        <path
          d="M14.4848 20C14.4848 20 23.5695 20 25.8229 19.4C27.0917 19.06 28.0459 18.08 28.3808 16.87C29 14.65 29 9.98 29 9.98C29 9.98 29 5.34 28.3808 3.14C28.0459 1.9 27.0917 0.94 25.8229 0.61C23.5695 0 14.4848 0 14.4848 0C14.4848 0 5.42037 0 3.17711 0.61C1.9286 0.94 0.954148 1.9 0.59888 3.14C0 5.34 0 9.98 0 9.98C0 9.98 0 14.65 0.59888 16.87C0.954148 18.08 1.9286 19.06 3.17711 19.4C5.42037 20 14.4848 20 14.4848 20Z"
          fill="#FF0033"
        />
        <path d="M19 10L11.5 5.75V14.25L19 10Z" fill="white" />
      </g>
      {/* <g>
        <path d="M37.1384 18.8999V13.4399L40.6084 2.09994H38.0184L36.6984 7.24994C36.3984 8.42994 36.1284 9.65994 35.9284 10.7999H35.7684C35.6584 9.79994 35.3384 8.48994 35.0184 7.22994L33.7384 2.09994H31.1484L34.5684 13.4399V18.8999H37.1384Z" />
        <path d="M44.1003 6.29994C41.0703 6.29994 40.0303 8.04994 40.0303 11.8199V13.6099C40.0303 16.9899 40.6803 19.1099 44.0403 19.1099C47.3503 19.1099 48.0603 17.0899 48.0603 13.6099V11.8199C48.0603 8.44994 47.3803 6.29994 44.1003 6.29994ZM45.3903 14.7199C45.3903 16.3599 45.1003 17.3899 44.0503 17.3899C43.0203 17.3899 42.7303 16.3499 42.7303 14.7199V10.6799C42.7303 9.27994 42.9303 8.02994 44.0503 8.02994C45.2303 8.02994 45.3903 9.34994 45.3903 10.6799V14.7199Z" />
        <path d="M52.2713 19.0899C53.7313 19.0899 54.6413 18.4799 55.3913 17.3799H55.5013L55.6113 18.8999H57.6012V6.53994H54.9613V16.4699C54.6812 16.9599 54.0312 17.3199 53.4212 17.3199C52.6512 17.3199 52.4113 16.7099 52.4113 15.6899V6.53994H49.7812V15.8099C49.7812 17.8199 50.3613 19.0899 52.2713 19.0899Z" />
        <path d="M62.8261 18.8999V4.14994H65.8661V2.09994H57.1761V4.14994H60.2161V18.8999H62.8261Z" />
        <path d="M67.8728 19.0899C69.3328 19.0899 70.2428 18.4799 70.9928 17.3799H71.1028L71.2128 18.8999H73.2028V6.53994H70.5628V16.4699C70.2828 16.9599 69.6328 17.3199 69.0228 17.3199C68.2528 17.3199 68.0128 16.7099 68.0128 15.6899V6.53994H65.3828V15.8099C65.3828 17.8199 65.9628 19.0899 67.8728 19.0899Z" />
        <path d="M80.6744 6.26994C79.3944 6.26994 78.4744 6.82994 77.8644 7.73994H77.7344C77.8144 6.53994 77.8744 5.51994 77.8744 4.70994V1.43994H75.3244L75.3144 12.1799L75.3244 18.8999H77.5444L77.7344 17.6999H77.8044C78.3944 18.5099 79.3044 19.0199 80.5144 19.0199C82.5244 19.0199 83.3844 17.2899 83.3844 13.6099V11.6999C83.3844 8.25994 82.9944 6.26994 80.6744 6.26994ZM80.7644 13.6099C80.7644 15.9099 80.4244 17.2799 79.3544 17.2799C78.8544 17.2799 78.1644 17.0399 77.8544 16.5899V9.23994C78.1244 8.53994 78.7244 8.02994 79.3944 8.02994C80.4744 8.02994 80.7644 9.33994 80.7644 11.7299V13.6099Z" />
        <path d="M92.6517 11.4999C92.6517 8.51994 92.3517 6.30994 88.9217 6.30994C85.6917 6.30994 84.9717 8.45994 84.9717 11.6199V13.7899C84.9717 16.8699 85.6317 19.1099 88.8417 19.1099C91.3817 19.1099 92.6917 17.8399 92.5417 15.3799L90.2917 15.2599C90.2617 16.7799 89.9117 17.3999 88.9017 17.3999C87.6317 17.3999 87.5717 16.1899 87.5717 14.3899V13.5499H92.6517V11.4999ZM88.8617 7.96994C90.0817 7.96994 90.1717 9.11994 90.1717 11.0699V12.0799H87.5717V11.0699C87.5717 9.13994 87.6517 7.96994 88.8617 7.96994Z" />
      </g> */}
    </svg>
  );
};



export const RewardsIcon: React.FC<IconProps> = ({ className = "", onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={`w-8 h-8 text-gray-700 cursor-pointer ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M172.9,27.6L172.9,27.6c2,0,5.6,0.3,7.9,2.5c0.5,0.5,2.1,2,2.1,5.7c0,4.1-2.2,10.7-8.6,16.6c-7.7,7.2-20.5,12.6-29.6,12.6c-2.7,0-3.9-0.5-4.1-0.5l0,0c-1.7-3.5,2-18.5,12.7-28.4C159,30.7,166.3,27.6,172.9,27.6 M172.9,10c-10.6,0-22.3,4.5-31.6,13.2c-16,14.9-25.3,42.4-12.9,53.9c4,3.7,9.8,5.3,16.3,5.3c13.7,0,30.8-7.2,41.6-17.3c16-14.9,18.9-36.4,6.4-47.9C187.6,12.3,180.5,10,172.9,10 M83.2,27.6c6.6,0,13.9,3.2,19.6,8.5c10.8,10,14.4,25.2,13,28.2c0,0-1.2,0.7-4.4,0.7c-9.2,0-21.9-5.4-29.6-12.6c-6.3-5.9-8.6-12.4-8.6-16.6c0-3.7,1.6-5.2,2.1-5.7C77.5,27.9,81.2,27.6,83.2,27.6 M83.2,10c-7.6,0-14.7,2.3-19.9,7.2c-12.4,11.6-9.5,33,6.5,47.9c10.8,10.1,27.9,17.3,41.6,17.3c6.5,0,12.3-1.6,16.3-5.3c12.4-11.6,3.1-39.1-12.9-53.9C105.4,14.5,93.7,10,83.2,10 M231.3,151.3V91.1c0-9.5-7.8-17.2-17.2-17.2h-77.4v77.4H231.3z M136.6,168.5V246H214c9.5,0,17.2-7.8,17.2-17.2v-60.2H136.6z M119.4,151.3V73.9H42c-9.5,0-17.2,7.8-17.2,17.2v60.2L119.4,151.3L119.4,151.3z M24.8,168.5v60.2c0,9.5,7.8,17.2,17.2,17.2h77.4v-77.5H24.8z" />
    </svg>
  );
};

export const CoinsIcon: React.FC<IconProps> = ({ className = "", onClick }) => {

  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={`w-8 h-8 text-gray-700 cursor-pointer ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <defs>
        <path id="$" d="M87.3,143.9l-0.1,3.6l-2,0.6c-5.8,1.7-8.9,6.7-7.9,12.5c0.7,4,3.8,6.7,10.7,9.6c6.2,2.6,8.8,5.8,7.9,9.7c-0.4,1.7-2.3,3.7-4.2,4.6c-3,1.2-9.5,0.5-12.5-1.5c-1.3-0.8-1.2-0.9-2.1,1.8l-0.7,2.2l2.2,1c1.2,0.6,3.6,1.2,5.3,1.5l3.1,0.5v3.4v3.4H89h2.1v-3.4v-3.4l2.7-1c1.4-0.6,3.4-1.6,4.3-2.4c4.9-4.1,5.1-12.5,0.3-16.8c-1-0.9-4.4-2.9-7.5-4.4c-3.2-1.5-6.1-3.2-6.6-3.9c-2.2-2.8-1.5-6.7,1.4-8.5c2.1-1.2,7.3-1.2,10.6,0c1.3,0.5,2.5,0.9,2.5,0.9c0.1,0,1.6-3.7,1.6-4.1c0-0.6-3.7-1.9-6.4-2.2l-2.4-0.3v-3.4v-3.4h-2.1h-2L87.3,143.9z" />
      </defs>
      <path d="M160,10.2c-14.3,1.7-24.7,5.1-34.8,11.3c-28.8,17.9-43.1,51-36.4,83.8c7.9,38.8,44,66.2,83.3,63.2c11.1-0.8,19.7-3.3,29.9-8.3c24.5-12.2,40.5-35.4,43.5-62.8c3.2-29.2-10.8-58.4-36-74.8c-10.2-6.6-22.5-10.9-35.1-12.3C170.4,10,163,9.9,160,10.2z M178.9,25.1c26.3,5.1,46.3,25,51.9,51.7c1.3,6.3,1.4,17.4,0.2,24c-2.3,12.7-8.3,24.4-17.2,33.7c-10.5,11-23.2,17.6-37.9,19.8c-5,0.7-15.1,0.6-20.2-0.3c-13.6-2.3-25.5-8.4-35.4-18.4c-12.8-12.8-19.2-28.4-19.2-46.6c0-13.2,3.6-25.1,11-36.2c3.4-5.1,11.1-13,16.1-16.7c9-6.4,20.3-10.7,31.2-12C164.4,23.6,173.7,24,178.9,25.1z"/>
      <path d="M68.4,89.9C28.1,101,2.9,142.3,11.8,183.2c8.4,39.3,46,66.7,85.7,62.3c33.1-3.6,60.7-27.3,68.9-59.1c1.4-5.6,0.7-8.5-2.5-10.5c-2.9-1.8-7.5-0.8-9.3,1.9c-0.4,0.6-1.1,2.8-1.7,4.9c-4.7,18.5-17.4,33.9-35.4,42.9c-4.1,2.1-11.5,4.5-16.7,5.4c-6.5,1.2-17.7,1.1-24-0.2C49.9,225.2,30,205,24.9,178.2c-1.2-6.4-1.1-18,0.2-24.3c2.6-12.6,8.3-23.4,17.1-32.6c8.8-9.2,19.1-15.3,30.9-18.3c4.4-1.2,6.3-2.3,7.1-4.4c1.5-3.6,0.2-7.4-3-9C75.1,88.5,73.3,88.6,68.4,89.9z"/>
      <use href="#$" transform="translate(-45, -85) scale(1.5)" />
      <use href="#$" transform="translate(30, -160) scale(1.5)" />

    </svg>
  )

}



