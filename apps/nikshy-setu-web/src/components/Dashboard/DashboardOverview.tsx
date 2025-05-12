import {
  CompletedAssessmentSvg,
  SubscribersSvg,
  VisitsSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import React from 'react';
import { DashboardOverviewCard } from '../Cards/DashboardOverviewCard';
interface DashboardOverviewProps {
  totalAssessment: number;
  totalActivities: number;
  totalSubscriber: number;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  totalActivities,
  totalAssessment,
  totalSubscriber,
}) => {
  return (
    <section className='pt-[50px]'>
      <div className='container mx-auto'>
        <div className='max-w-[1140px] mx-auto'>
          <div className='grid md:grid-cols-3 gap-[28px]'>
            <DashboardOverviewCard
              imgSrc={SubscribersSvg}
              title={'Subscribers'}
              count={totalSubscriber}
              color={'#F3CA3B'}
            />
            <DashboardOverviewCard
              imgSrc={VisitsSvg}
              title={'Visits'}
              count={totalActivities + 1855041}
              color={'#3FDD6C'}
            />
            <DashboardOverviewCard
              imgSrc={CompletedAssessmentSvg}
              title={'Completed Assessment'}
              // hot fixCount
              count={totalAssessment + 17439}
              color={'#635AD9'}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
