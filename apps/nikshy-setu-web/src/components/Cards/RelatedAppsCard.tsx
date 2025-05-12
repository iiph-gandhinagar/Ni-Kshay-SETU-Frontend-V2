import { ArrowSvg } from '@nikshay-setu-v3-monorepo/assets';
import { STORE_URL } from '@nikshay-setu-v3-monorepo/constants';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLanguageObject } from '../../utils/HelperHooks';
import BottomSheet from './BottomSheet';

interface RelatedAppsCardProps {
  onClick?: () => void;
}
export const RelatedAppsCard: React.FC<RelatedAppsCardProps> = ({
  onClick = () => null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [langKey, getText, objectToValue] = useLanguageObject();

  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
  };
  const { error, data, loadingApis } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const getHref = (href) => {
    // Check if the href is a package name (e.g., "org.rntcp.nikshay")
    const isPackageName = href && !href.includes('http');
    if (isPackageName) {
      // Construct the Play Store URL
      return `https://play.google.com/store/apps/details?id=${href}`;
    }
    // Return the href if it's a valid URL
    return href || '#';
  };

  return (
    <>
      <div
        className='px-6 py-3 bg-F8FAFF rounded-[12px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] border-[0.5px] border-lightGreyF4F4F4 cursor-pointer'
        onClick={() => setIsOpen(true)}
      >
        <div className='flex justify-between items-center'>
          <div className='flex flex-col'>
            <h5 className='font-medium text-[24px] -tracking-[0.16px] text-darkBlue'>
              {getText('APP_RELATED_APPLICATIONS')}
            </h5>
            <h6 className='text-darkGray4D4D4D text-[14px] mt-[12px]'>
              {getText('HOME_TOOLS_SUB_DEC')}
            </h6>
          </div>
          <img
            src={ArrowSvg}
            alt='Arrow'
            className='w-[24px] h-[24px] shrink-0'
          />
        </div>
      </div>
      <BottomSheet isOpen={isOpen} toggleBottomSheet={toggleBottomSheet}>
        <h2 className='text-lg font-semibold mb-4 text-center'>
          {getText('APP_RELATED_APPLICATIONS')}
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-[30px]'>
          {data?.homeScreen?.home_page_info?.flashSimilarApps?.map((item) => {
            const href = getHref(item?.href);

            return (
              <a
                href={href}
                key={item?._id}
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center space-y-2 p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'
              >
                <img
                  src={STORE_URL + item?.image}
                  alt={item?.title}
                  className='h-16 w-16 object-contain'
                />
                <p className='text-sm font-medium text-center'>{item?.title}</p>
              </a>
            );
          })}
        </div>
      </BottomSheet>
    </>
  );
};
