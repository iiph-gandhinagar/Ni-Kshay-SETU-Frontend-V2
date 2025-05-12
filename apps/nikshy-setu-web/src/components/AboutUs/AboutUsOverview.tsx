import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { AppConfigDetails } from '@nikshay-setu-v3-monorepo/types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
interface AboutUsOverviewProps {
  title?: string;
  description?: string;
}
export const AboutUsOverview: React.FC<AboutUsOverviewProps> = ({
  title = '',
  description = '',
}) => {
  const [Description, setDescription] = useState('<p>Loading</p>');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      createAction<null, AppConfigDetails>(
        {
          method: 'GET',
          url: 'APP_CONFIG_DETAILS',
        },
        (status, res) => {
          if (status === 200) {
            const aboutUsContent = res?.masterCms?.filter(
              (v) => v?.title === 'About CGC'
            );
            console.log(aboutUsContent?.[0]?.description?.en);
            setDescription(aboutUsContent?.[0]?.description?.en);
          }
        }
      )
    );
  }, []);
  return (
    <section className='pt-[48px]'>
      <div className='container mx-auto'>
        <div className='max-w-[1140px] mx-auto'>
          <div>
            <span className='bg-darkBlue/10 text-darkBlue text-[12px] font-medium px-[8px] py-[2px] rounded-[36px] uppercase leading-[18px]'>
              About
            </span>
            <h2 className='mt-[16px] text-3xl md:text-[48px] font-bold -tracking-[0.32px] md:leading-[60px]'>
              {title}
            </h2>
            <p className='mt-[16px] font-medium text-darkSilver leading-6'>
              {description}
            </p>
          </div>
          <div
            className='bg-F4FFFF rounded-2xl p-[28px] mt-[28px]'
            dangerouslySetInnerHTML={{ __html: Description }}
          />
        </div>
      </div>
    </section>
  );
};
