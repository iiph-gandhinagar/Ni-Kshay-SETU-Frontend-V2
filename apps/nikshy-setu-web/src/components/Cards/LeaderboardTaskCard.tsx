import React from 'react';
import { useLanguageObject } from '../../utils/HelperHooks';
interface LeaderboardTaskCardProps {
  name?: string;
  fromBgColor?: string;
  toBgColor?: string;
  medalIcon?: string;
  fromOffset?: string;
  toOffset?: string;
  data?: any;
  isActiveBadge?: boolean;
}
export const LeaderboardTaskCard: React.FC<LeaderboardTaskCardProps> = ({
  name = '',
  fromBgColor = '',
  isActiveBadge = true,
  toBgColor = '',
  medalIcon = '',
  fromOffset = '',
  toOffset = '',
  data,
}) => {
  const [langKey, getText, objectToValue] = useLanguageObject();

  const getDisplayName = (action) => {
    switch (action) {
      case 'appOpenedCount':
        return getText('APP_OPENED');
      case 'minSpent':
        return getText('MIN_SPENT');
      case 'subModuleUsageCount':
        return getText('SUB_MOD_VISITED');
      case 'chatbotUsageCount':
        return getText('CHATBOT_USAGE');
      case 'kbaseCompletion':
        return getText('KNOWLEDGE_CONNECT_USAGE');
      case 'totalAssessments':
        return getText('TOTAL_ASSESS');
      case 'correctnessOfAnswers':
        return getText('ASSESSMENT_ACCURACY');
      default:
        return action;
    }
  };

  return (
    <div
      className='drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)] min-w-[205px]'
      style={{ opacity: isActiveBadge ? '1' : '0.5' }}
    >
      <div
        style={{
          background: `linear-gradient(90deg, ${fromBgColor} ${fromOffset}, ${toBgColor} ${toOffset} )`,
        }}
        className='px-[12px] py-[4px] rounded-t-[16px]'
      >
        <div className='flex gap-[8px] items-center'>
          <img src={medalIcon} alt='Icon' className='w-10 h-10' />
          <h6 className='text-[18px] leading-[23.9px] -tracking-[0.16px] text-white font-semibold'>
            {name}
          </h6>
        </div>
      </div>
      <div className='px-[12px] pt-[8px] pb-2 bg-white rounded-b-[16px]'>
        {data?.map(
          (task) =>
            task?.target !== 0 && (
              <div className='flex justify-between' key={task.action}>
                <span className='text-[14px] font-medium -tracking-[0.16px] leading-[18.59px] block text-darkSilver'>
                  {getDisplayName(task.action)}:
                </span>
                <span className='text-[14px] font-medium -tracking-[0.16px] leading-[18.59px] block text-darkSilver'>
                  {!task?.isComplete
                    ? `${parseInt(task.current)}/${parseInt(task.target)}`
                    : `${parseInt(task.target)}/${parseInt(task.target)}`}
                </span>
              </div>
            )
        )}
      </div>
    </div>
  );
};
