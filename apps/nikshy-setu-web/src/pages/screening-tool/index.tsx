import { useState } from 'react';
import { Screening } from '../../components/ScreeningTool/Screening';
import ScreeningToolSymptom from '../../components/ScreeningTool/screeningTool';

export const ScreeningTool = () => {
  const [tab, setTab] = useState<number>(1);
  return (
    <section className='pt-[48px] pb-[58px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='flex flex-col gap-[28px]'>
          <div className=''>
            {tab == 1 ? (
              <Screening setTab={setTab} />
            ) : (
              <ScreeningToolSymptom />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
