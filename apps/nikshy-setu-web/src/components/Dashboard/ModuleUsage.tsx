import {
  ChatbotSvg,
  DiagnosisAlgorithmsSvg,
  guidanceOnAdrBluePng,
  KnowledgeConnectBluePng,
  ResourceMaterialSvg,
  TreatmentAlgorithmsSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import React from 'react';
import { DashboardProps } from 'shared/types/src/screens/StaticContact';
import { CadrewiseSubscribersCard } from '../Cards/CadrewiseSubscribersCard';
import { LevelwiseSubscribersCard } from '../Cards/LevelwiseSubscribersCard';
import { ModuleUsageCard } from '../Cards/ModuleUsageCard';
interface ModuleUsageProps {
  title?: string;
  data?: DashboardProps;
}

const ModuleUsageCardImg = {
  'Treatment Algorithm': TreatmentAlgorithmsSvg,
  'Diagnosis Algorithm': DiagnosisAlgorithmsSvg,
  'Resource Material': ResourceMaterialSvg,
  'Knowledge Connect': KnowledgeConnectBluePng,
  'Guidance on ADR': guidanceOnAdrBluePng,
  Chatbot: ChatbotSvg,
};

export const ModuleUsage: React.FC<ModuleUsageProps> = ({
  title = '',
  data,
}) => {
  return (
    <section className='pt-[64px] pb-[110px]'>
      <div className='container mx-auto'>
        <div className='max-w-[1140px] mx-auto'>
          <div>
            <span className='bg-darkBlue/10 text-darkBlue text-[12px] font-medium px-[8px] py-[2px] rounded-[36px] leading-[18px]'>
              Module
            </span>
            <h2 className='mt-[16px] text-xl md:text-[28px] font-bold -tracking-[0.32px] md:leading-[33.6px]'>
              {title}
            </h2>
          </div>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[16px] lg:gap-[28px] mt-[48px]'>
            {data?.moduleUsage?.map((item, i) => {
              const updated = {
                'Diagnosis Algorithm': item?.ActivityCount + 5784,
                'Treatment Algorithm': item?.ActivityCount + 4263,
                'Resource Material': item?.ActivityCount + 12629,
                'Knowledge Connect': item?.ActivityCount,
                'Guidance on ADR': item?.ActivityCount + 3170,
                undefined: 0,
              };
              return (
                <ModuleUsageCard
                  key={i}
                  imgSrc={
                    ModuleUsageCardImg[item.ModuleName] || ResourceMaterialSvg
                  }
                  title={item?.ModuleName}
                  count={
                    (Object.keys(updated).includes(item?.ModuleName) &&
                      updated[item?.ModuleName]) ||
                    item?.ActivityCount
                  }
                />
              );
            })}
          </div>
          <div className='grid md:grid-cols-2 gap-[28px] pt-[64px]'>
            <CadrewiseSubscribersCard
              title='Cadrewise Subscribers (Top 5)'
              data={data?.cadreWiseSubscribers}
            />
            <LevelwiseSubscribersCard
              title='Levelwise Subscribers'
              data={data?.levelWiseSubscribers}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
