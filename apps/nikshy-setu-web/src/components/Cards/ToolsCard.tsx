import { langKeyForPlugin } from '@nikshay-setu-v3-monorepo/constants';
import { useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';

interface ToolsCardProps {
  title: string;
  image: string;
  path?: string;
}
export const ToolsCard: React.FC<ToolsCardProps> = ({
  title = '',
  image = '',
  path = '',
}) => {
  const navigate = useNavigate();
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <div
      onClick={() => navigate(path)}
      className='bg-lightGreyF8F8F8 py-[12px] px-[18px] cursor-pointer rounded-[12px]'
    >
      <div className='flex gap-[12px] items-center'>
        <img src={image} alt='Tools icon' className='w-16 h-16' />
        <h6 className='leading-[18.4px] font-medium text-[14px]'>
          {getText(langKeyForPlugin[title]) || title}
        </h6>
      </div>
    </div>
  );
};
