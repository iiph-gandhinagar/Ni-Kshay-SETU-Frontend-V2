import {
  InfoOutlineSvg,
  KnowledgeBaseSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
import { Searchbar2 } from '../Inputs/Searchbar';
import { CommonPluginInfoModal } from '../PluginInfoModal/CommonPluginInfoModal';
interface KnowledgeConnectCardProps {
  title?: string;
}
export const KnowledgeConnectCard: React.FC<KnowledgeConnectCardProps> = ({
  title = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [infoModal, setInfoModal] = useState(false);
  const navigate = useNavigate();
  const sessionId = useSelector(
    (state: RootReducerStates) => state.appContext.data?.chatScreen?.sessionId
  );
  const [langKey, getText, objectToValue] = useLanguageObject();

  const formSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      navigate(
        `/ask-setu?sessionId=${sessionId}&question=${inputValue.trim()}`
      );
    }
  };

  return (
    <section className='pt-[48px] pb-[58px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='bg-gradient-to-b from-DARK_BLUE_383A68 from-12% to-LIGHT_BLUE_6F73CE to-100% p-[16px] md:p-5 rounded-[28px]'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-[12px] items-center'>
              <img
                src={KnowledgeBaseSvg}
                alt='Knowledge Base'
                className='w-8 h-8 md:w-12 md:h-12'
              />
              <h3 className='text-xl md:text-2xl font-bold -tracking-[0.16px] xl:text-[38px] leading-[35px] text-FFCC18'>
                {title}
              </h3>
            </div>
            <img
              src={InfoOutlineSvg}
              className='cursor-pointer'
              onClick={() => {
                setInfoModal(true);
              }}
              alt='Info'
            />
          </div>
          <div className='lg:mx-12'>
            <form onSubmit={formSubmit}>
              <Searchbar2
                value={inputValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setInputValue(event.target.value);
                }}
                showSearchIcon
                inputClassName='ps-[56px]'
                placeholder={getText('APP_SEARCH') + '...'}
              />
            </form>
          </div>
        </div>
      </div>
      {infoModal && (
        <CommonPluginInfoModal
          closeModal={() => {
            setInfoModal(false);
          }}
          text={getText('APP_KNOWLEDGE_CONNECT_INFO')}
        ></CommonPluginInfoModal>
      )}
    </section>
  );
};
