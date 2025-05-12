interface NewsFeedCardProps {
  title: string;
  source: string;
  image: string;
  href: string;
}
export const NewsFeedCard: React.FC<NewsFeedCardProps> = ({
  title = '',
  source = '',
  image = '',
  href = '',
}) => {
  const handleCardClick = () => {
    window.open(href, '_blank');
  };
  // console.log("image");
  // image cors error
  return (
    <div
      onClick={handleCardClick}
      className='px-2 py-4 bg-white rounded-[12px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] my-[12px] cursor-pointer'
    >
      <div className='flex gap-[12px] items-center'>
        <img
          className='h-[100px] w-auto'
          src={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQkZEEdZ-nF4cGbfz3dMHMg0ZvkJ9PrHKmaw&s'
          }
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
          alt='Example'
        />
        <div className='flex flex-col overflow-hidden'>
          <h6 className='font-semibold leading-4 line-clamp-2 overflow-hidden text-ellipsis'>
            {title}
          </h6>
          <span className='text-[14px] font-medium mt-2 text-darkGray495555 overflow-hidden text-ellipsis whitespace-nowrap'>
            Source: {source}
          </span>
        </div>
      </div>
    </div>
  );
};
