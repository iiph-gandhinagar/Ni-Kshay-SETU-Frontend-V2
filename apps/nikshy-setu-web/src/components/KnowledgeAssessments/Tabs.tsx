interface TabNavigationProps {
  label: string;
  isActive: boolean;
  onclick?: () => void;
  customClass?: string;
}

export const QueryTabNavigation: React.FC<TabNavigationProps> = ({
  label,
  isActive,
  onclick,
  customClass = ' ',
}) => {
  return (
    <div className='relative'>
      <button
        onClick={onclick}
        className={`${
          isActive
            ? 'text-[#F18282] text-[24px] pb-[10px] font-semibold'
            : `text-white text-[18px]`
        }   ${customClass}`}
      >
        <span>{label}</span>
        {isActive && (
          <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#F18282]' />
        )}
      </button>
    </div>
  );
};
