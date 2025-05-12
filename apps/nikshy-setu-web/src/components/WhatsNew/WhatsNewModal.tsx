import { CloseSvg } from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  MaterialListProps,
  ModuleListProps,
  ReleaseListProps,
  StaticMaterialProps,
  StaticModuleProps,
  StaticReleaseProps,
} from 'shared/types/src/screens/StaticContact';
import { CustomModal } from '../Layouts/CustomModal';
import { WhatsNewTabs } from '../Tabs/Tabs';
import { AppReleasesCarousel } from './AppReleasesCarousel';
import { ResourceMaterialCarousel } from './ResourceMaterialCarousel';

export const WhatsNewModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [moduleList, setModuleList] = useState<ModuleListProps[]>([]);
  const [materialList, setMaterialList] = useState<MaterialListProps[]>([]);
  const [releaseList, setReleaseList] = useState<ReleaseListProps[]>([]);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const tabs = [
    {
      label: 'Modules',
      count: 8,
    },
    {
      label: 'Resource Material',
      count: 6,
    },
    {
      label: 'App Releases',
      count: 2,
    },
  ];
  useEffect(() => {
    if (isOpen)
      if (activeTab === 0) {
        dispatch(
          createAction<null, StaticModuleProps>(
            {
              method: 'GET',
              url: 'GET_STATIC_MODULE',
            },
            (code, response) => {
              if (code == 200) {
                setModuleList(response?.list);
              }
            }
          )
        );
      } else if (activeTab === 1) {
        dispatch(
          createAction<null, StaticMaterialProps>(
            {
              method: 'GET',
              url: 'GET_RESOURCE_MATERIAL',
            },
            (code, response) => {
              if (code == 200) {
                setMaterialList(response?.list);
              }
            }
          )
        );
      } else if (activeTab === 2) {
        dispatch(
          createAction<null, StaticReleaseProps>(
            {
              method: 'GET',
              url: 'GET_RELEASE_MATERIAL',
            },
            (code, response) => {
              if (code == 200) {
                setReleaseList(response?.list);
              }
            }
          )
        );
      }
    return () => {
      setModuleList([]);
      setMaterialList([]);
      setReleaseList([]);
    };
  }, [activeTab, dispatch, isOpen]);

  return (
    <CustomModal
      isOpen={isOpen}
      styles={{
        modal: { padding: '24px!important' },
        overlay: { background: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'none' },
      }}
      customClass={{ modal: '!max-w-2xl' }}
      closeModal={onClose}
    >
      <div className=''>
        {/* Header */}
        <div className='flex flex-col items-center text-center'>
          <button onClick={onClose} className='self-end'>
            <img src={CloseSvg} alt='Close' />
          </button>
          <div className='max-w-[470px] mx-auto'>
            <span className='bg-darkBlue/10 text-darkBlue text-[12px] font-medium px-[8px] py-[2px] rounded-[36px] uppercase leading-[18px]'>
              NEW
            </span>
            <h2 className='mt-[2px] text-3xl md:text-[28px] font-bold -tracking-[0.32px] md:leading-[60px]'>
              What’s new
            </h2>
            <p className='mt-[4px] font-medium text-darkSilver leading-6'>
              Check out our most recent updates, from small fixes to new
              features
            </p>
          </div>
          <div className='flex flex-wrap my-[28px] gap-1 lg:gap-8'>
            {tabs.map((item, index) => (
              <WhatsNewTabs
                label={item?.label}
                count={
                  activeTab == index
                    ? index === 0
                      ? moduleList?.length || 0
                      : index === 2
                      ? releaseList?.length || 0
                      : index === 1
                      ? materialList?.length || 0
                      : undefined
                    : undefined
                }
                key={index}
                isActive={activeTab === index}
                onClick={() => setActiveTab(index)}
              />
            ))}
          </div>
        </div>
        <div className='bg-F4FFFF rounded-2xl p-4'>
          {activeTab === 0 ? (
            <AppReleasesCarousel
              data={moduleList?.sort((a, b) => a.orderIndex - b.orderIndex)}
            />
          ) : activeTab === 2 ? (
            <AppReleasesCarousel
              data={releaseList?.sort((a, b) => a.orderIndex - b.orderIndex)}
            />
          ) : (
            <ResourceMaterialCarousel
              data={materialList?.sort((a, b) => a.orderIndex - b.orderIndex)}
            />
          )}
        </div>
      </div>
    </CustomModal>
  );
};
