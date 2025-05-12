import { createAction } from '@nikshay-setu-v3-monorepo/store';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StaticFaqProps } from 'shared/types/src/screens/StaticContact';
import { OverlayLoader } from '../Animations/Loader';
import { ChevronRight3 } from '../Icon/ChevronRight';
interface FAQProps {
  title?: string;
  description?: string;
}
export const FAQ: React.FC<FAQProps> = ({ title = '', description = '' }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loader, setLoading] = useState(false);
  const [list, setList] = useState<StaticFaqProps[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(
      createAction<null, StaticFaqProps[]>(
        {
          method: 'GET',
          url: 'GET_ALL_FAQ',
        },
        (res, data) => {
          setLoading(false);
          if (res == 200) setList(data);
        }
      )
    );
    return () => {
      setList([]);
    };
  }, []);
  return loader ? (
    <OverlayLoader />
  ) : (
    <section className='pt-[58px]' id='faq'>
      <div className='container mx-auto'>
        <div className='max-w-[1140px] mx-auto'>
          <div>
            <span className='bg-darkBlue/10 text-darkBlue text-[12px] font-medium px-[8px] py-[2px] rounded-[36px] uppercase leading-[18px]'>
              FAQ
            </span>
            <h2 className='mt-[16px] text-3xl md:text-[48px] font-bold -tracking-[0.32px] md:leading-[60px]'>
              {title}
            </h2>
            <p className='mt-[16px] font-medium text-darkSilver leading-6'>
              {description}
            </p>
          </div>
          <div className='grid lg:grid-cols-2 mt-[24px]'>
            <div className='rounded-2xl bg-white my-6 lg:-mr-[80px] border border-darkSilver/50 z-20 overflow-hidden'>
              {list?.map((item, i) => {
                return (
                  <div
                    onClick={() => setActiveTab(i)}
                    className={`${
                      activeTab === i ? 'bg-F4FFFF' : ''
                    } flex items-center px-[16px] py-[24px] justify-between drop-shadow-[0_0_1px_rgba(0,0,0,0.15)] cursor-pointer`}
                    key={i}
                  >
                    <div className='flex items-center gap-[16px] '>
                      {/* <div className={`shrink-0 ${activeTab === i ? 'bg-darkBlue' : 'bg-GREY_808080'} w-[10px] h-[10px] rounded-full`} /> */}
                      <h6 className='text-[16px] leading-[24px]'>
                        {item?.question?.en}
                      </h6>
                    </div>
                    <ChevronRight3 />
                  </div>
                );
              })}
            </div>
            <div className='bg-F4FFFF rounded-[16px] lg:pl-[100px] pl-4 py-6 pr-4 drop-shadow-[0_0_4px_rgba(0,0,0,0.15)]'>
              <h6 className='font-bold text-[18px] text-darkGray4D4D4D leading-[28px]'>
                {list?.[activeTab]?.question?.en}
              </h6>
              <p
                className='text-[16px] mt-8 leading-[24px]'
                dangerouslySetInnerHTML={{
                  __html: list?.[activeTab]?.description?.en,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
