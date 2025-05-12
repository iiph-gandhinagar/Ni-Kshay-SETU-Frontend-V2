import { langKeyForPlugin } from '@nikshay-setu-v3-monorepo/constants';
import { useNavigate } from 'react-router-dom';
import { createActivityPayloadAndSendActivity } from 'shared/store/src/user-activity/UserActivity';
import { useLanguageObject } from '../../utils/HelperHooks';

interface TopModulesCardProps {
  name: string;
  fromBgColor: string;
  toBgColor: string;
  image: string;
  path?: string;
}
export const TopModulesCard: React.FC<TopModulesCardProps> = ({
  name = '',
  fromBgColor = '',
  toBgColor = '',
  image = '',
  path = '',
}) => {
  const navigate = useNavigate();
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <div
      style={{
        background: `linear-gradient(${fromBgColor} 12%, ${toBgColor} 100%)`,
      }}
      className='pt-4 pb-[24px] px-6 rounded-[8px] cursor-pointer'
      onClick={() => {
        createActivityPayloadAndSendActivity({
          module: 'Home',
          action: name.replace(' ', '-').toLowerCase() + '-plugin-click',
        });
        navigate(path);
      }}
    >
      <div className='flex justify-between items-start'>
        <img src={image} alt='icon' className='w-12 h-12' />
        {/* <img src={EditSvg} alt='Edit' className='w-[18px] h-[18px]' /> */}
      </div>
      <h4
        className={`font-medium text-[24px] leading-[32.77px] -tracking-[0.64px] ${
          name === 'Knowledge Connect' ? 'text-FFCC18' : 'text-white'
        } mt-1`}
      >
        {getText(langKeyForPlugin[name]) || name}
      </h4>
    </div>
  );
};
