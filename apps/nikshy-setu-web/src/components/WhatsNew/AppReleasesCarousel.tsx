import { BugSvg, FeatureSvg } from '@nikshay-setu-v3-monorepo/assets';
import moment from 'moment';
import { FC, useEffect, useRef, useState } from 'react';
import { StackedCarousel } from 'react-card-stack-carousel';
import 'react-card-stack-carousel/styles/styles.css'; // import base styles
import {
  ModuleListProps,
  ReleaseListProps,
} from 'shared/types/src/screens/StaticContact';
interface AppReleasesCarouselProps {
  data: ModuleListProps[] | ReleaseListProps[];
}
export const AppReleasesCarousel: FC<AppReleasesCarouselProps> = ({ data }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(250);
  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContentHeight(entry.target.clientHeight);
      }
    });
    observer.observe(element);
    return () => {
      setContentHeight(250);
      observer.disconnect();
    };
  }, [data]);
  return (
    <>
      {data.length == 0 && <p className='text-center'>No Data</p>}
      {data?.length > 0 && (
        <StackedCarousel
          height={contentHeight + 30}
          styleOverrides={{ CarouselItem: { width: '100%', height: '100%' } }}
          verticalOffset={-10}
        >
          {data?.map((e, index: number) => {
            return (
              <div
                ref={contentRef}
                key={e._id}
                className={`bg-white rounded-[24px] flex flex-col p-[16px] md:p-[28px] shadow-xl items-center w-full min-h-60`}
              >
                <div className='flex gap-[12px]'>
                  <div className='bg-darkBlue w-[48px] h-[48px] flex items-center justify-center ring-[6px] ring-[#F7F8F9] rounded-full'>
                    <h6 className='text-white leading-6 font-semibold'>
                      {index + 1}
                    </h6>
                  </div>
                  <img
                    src={
                      e?.image?.[0]
                        ? process.env.NX_PUBLIC_STORE_URL + e?.image?.[0]
                        : e?.feature?.en
                        ? FeatureSvg
                        : BugSvg
                    }
                    alt='Video'
                    className='w-[48px] h-[48px]'
                  />
                </div>
                <div className='flex flex-col my-[28px] gap-[4px] items-center text-center'>
                  {(e?.feature || e?.bugFix || e?.title?.en).map((e) => {
                    return <h6 className='leading-6 font-bold'>{e.en}</h6>;
                  })}
                </div>
                <h6 className='text-[16px] font-medium leading-[24px] text-darkSilver'>
                  Date:{' '}
                  {(e.date && moment(e.date).format('MMM DD,YYYY')) || 'N/A'}
                </h6>
              </div>
            );
          })}
        </StackedCarousel>
      )}
    </>
  );
};
