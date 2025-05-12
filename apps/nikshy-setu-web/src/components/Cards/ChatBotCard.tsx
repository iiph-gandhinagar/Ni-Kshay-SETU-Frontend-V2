import { botHeyAnimation, HistorySvg } from '@nikshay-setu-v3-monorepo/assets';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
import { Searchbar2 } from '../Inputs/Searchbar';
import { Typewriter } from '../Text/Typewriter';

interface ChatBotCardProps {
  step?: number;
  chatBotText?: string;
  onClickBackArrow?: () => void;
}
export const ChatBotCard: React.FC<ChatBotCardProps> = ({
  step = 0,
  chatBotText = '',
  onClickBackArrow = () => null,
}) => {
  return (
    <div className='bg-F4FFFF px-3 pb-1 pt-8 mb-[48px] rounded-[24px]'>
      <div
        className='flex gap-[12px] items-center py-3'
        // onClick={onClickBackArrow}
      >
        {/* <img
          src={DropdownArrowSvg}
          alt='history'
          className='cursor-pointer w-6 h-6 rotate-90'
        /> */}
        <div className='w-[54px] h-[66px] shrink-0'>
          <Lottie
            animationData={botHeyAnimation}
            loop={true}
            style={{ width: '100%', height: '100%' }}
            className='scale-[2.5]'
          />
        </div>
        <div>
          <h6 className='text-sm sm:text-base text-darkGray495555 font-medium sm:leading-[24px]'>
            {step === 0 || step === 1 ? 'Hi !' : step === 3 ? 'Great !' : ''}{' '}
            <span role='img' aria-label='emoji'>
              {step === 0 || step === 1 ? '😊' : step === 3 ? '🎉' : null}
            </span>
          </h6>
          <h6 className='text-sm sm:text-base text-darkGray495555 font-medium sm:leading-[24px]'>
            <Typewriter text={chatBotText} delay={50} />
          </h6>
        </div>
      </div>
      <div className='mx-4 mt-6'>
        <div className='w-full bg-CCCCCC rounded-full h-2'>
          <div
            className='bg-[#4B5FC2] h-2 rounded-l-full'
            style={{ width: step * 100 + '%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

interface ChatBotHomeCardProps {
  showHistoryIcon?: boolean;
  showSearchbar?: boolean;
  title?: string;
  titleClassName?: string;
  chatBotText?: string;
  chatBotTextClassName?: string;
}
export const ChatBotHomeCard: React.FC<ChatBotHomeCardProps> = ({
  showHistoryIcon = false,
  showSearchbar = true,
  title = '',
  titleClassName = '',
  chatBotText = '',
  chatBotTextClassName = '',
}) => {
  const navigate = useNavigate();
  const [langKey, getText, objectToValue] = useLanguageObject();
  return (
    <section className='pt-[48px] pb-[58px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='bg-gradient-to-r from-[#9C5ED733] from-0% via-[#635AD933] via-50% to-[#E8A0A033] to-100% p-[16px] md:p-5 rounded-[28px]'>
          <div className='flex gap-[12px] items-center'>
            <div className='w-14 h-[76px] shrink-0'>
              <Lottie
                animationData={botHeyAnimation}
                loop={true}
                style={{ width: '100%', height: '100%' }}
                className='scale-[2.5]'
              />
            </div>
            <div className='flex gap-[12px]'>
              <div>
                <h1
                  className={`text-2xl font-bold -tracking-[0.16px] xl:text-[48px] leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#9C5ED7] from-0% via-[#635AD9] via-50% to-[#E8A0A0] to-100% ${titleClassName} inline-block`}
                >
                  {title}
                </h1>
                <h6
                  className={`text-sm sm:text-[24px] text-darkGray4D4D4D font-medium sm:leading-[31.09px] -tracking-[0.16px] mt-1 ${chatBotTextClassName}`}
                >
                  {chatBotText}
                </h6>
              </div>
              {showHistoryIcon ? (
                <Link to={'/chat-history'}>
                  {' '}
                  <img
                    src={HistorySvg}
                    alt='history'
                    className='cursor-pointer w-[3.5rem] h-6'
                  />{' '}
                </Link>
              ) : null}
            </div>
          </div>
          {showSearchbar ? (
            <Searchbar2
              placeholder={getText('CHAT_ASK_ANYTHING')}
              onFocus={() => {
                navigate('/chat');
              }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};
