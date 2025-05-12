interface TabNavigationProps {
  label: string;
  activeTab: boolean;
  onClick?: () => void;
}

export const LeaderboardTabs: React.FC<TabNavigationProps> = ({
  label,
  activeTab,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-[8px] rounded-[11px] cursor-pointer ${
        activeTab ? 'bg-gradient-to-r from-[#FF8008] to-[#FFC837]' : ''
      } ${
        activeTab
          ? 'text-white text-[18px] leading-[23.9px] font-semibold'
          : 'text-darkSilver text-[16px] leading-[21.25px]'
      }`}
    >
      {label}
    </div>
  );
};
interface WhatsNewTabsProps {
  label: string;
  isActive: boolean;
  onClick?: () => void;
  count?: number;
}

export const WhatsNewTabs: React.FC<WhatsNewTabsProps> = ({
  label,
  isActive,
  onClick,
  count,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex gap-2 text-[18px] px-1 md:px-[12px] py-1 md:py-2 ${
        isActive
          ? 'text-[#F18282] font-medium border-b-[1.5px] border-[#F18282]'
          : 'text-[#ACABAB]'
      }   `}
    >
      {count !== undefined && (
        <div
          className={`${
            isActive ? 'bg-[#F18282]/20' : 'bg-[#D9D9D9]'
          } rounded-full px-[7px] py-[2px] w-[24px] h-[24px] flex items-center justify-center`}
        >
          <h6
            className={`text-[16px] ${
              isActive ? 'text-[#F18282]' : 'text-darkSilver'
            }`}
          >
            {count}
          </h6>
        </div>
      )}
      <span>{label}</span>
    </button>
  );
};
