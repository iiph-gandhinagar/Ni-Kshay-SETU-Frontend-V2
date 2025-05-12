import React from 'react';
import { RelatedAppsCard } from '../Cards/RelatedAppsCard';
interface RelatedApplicationsProps {
  onClick?: () => void;
}
export const RelatedApplications: React.FC<RelatedApplicationsProps> = ({
  onClick = () => null,
}) => {
  return (
    <section>
      <div className='lg:max-w-[1012px] mx-auto'>
        <RelatedAppsCard onClick={onClick} />
      </div>
    </section>
  );
};
