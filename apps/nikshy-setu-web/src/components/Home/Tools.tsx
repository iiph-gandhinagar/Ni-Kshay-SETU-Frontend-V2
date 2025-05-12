import React from 'react';
import { ToolsCard } from '../Cards/ToolsCard';
interface ToolsProps {
  toolsData?: Array<{
    image: string;
    title: string;
    path?: string;
  }>;
}
export const Tools: React.FC<ToolsProps> = ({ toolsData }) => {
  return (
    <section className='py-[58px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <h5 className='text-darkGray4D4D4D font-medium text-[24px] -tracking-[0.16px]'>
          Tools
        </h5>
        <div className='mt-[12px] grid md:grid-cols-2 xl:grid-cols-4 xl:gap-[38px] gap-4'>
          {toolsData?.map((item, i) => {
            return (
              <ToolsCard
                path={item?.path}
                key={i}
                title={item?.title}
                image={item?.image}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
