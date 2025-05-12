interface CardProps {
  iconUrl: string;
  title: string;
  onClick: () => void;
}
const AlgoCard: React.FC<CardProps> = ({ iconUrl, title, onClick }) => {
  return (
    <div
      className='w-auto  rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 my-2 hover:border-[#394F89] cursor-pointer'
      onClick={onClick}
    >
      <div className='flex flex-row items-center space-x-3 p-3 px-3'>
        <div className='flex items-center justify-center w-8 h-8 rounded-full bg-red-50 shrink-0'>
          <img
            src={iconUrl}
            alt='icon'
            className='w-full h-full object-cover'
          />
        </div>
        <h2 className='px-3 text-lg font-semibold text-black text-[20px]'>
          {title}
        </h2>
      </div>
    </div>
  );
};

export default AlgoCard;
