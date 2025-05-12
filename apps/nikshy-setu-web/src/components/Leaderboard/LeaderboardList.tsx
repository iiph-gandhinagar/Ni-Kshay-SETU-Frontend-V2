import React, { ReactNode } from 'react';
import { LeaderboardListCard } from '../Cards/LeaderboardListCard';

interface LeaderboardListProps {
  data: any;
  lastElementRef: (node: ReactNode | null) => void;
  loading: boolean;
}
export const LeaderboardList: React.FC<LeaderboardListProps> = ({
  data,
  lastElementRef,
  loading,
}) => {
  return (
    <div className='bg-[#EDEFFB] p-3 md:p-4 rounded-t-[28px] shadow-[0_-4px_74.2px_rgba(0,0,0,0.25)] space-y-3 md:space-y-4 overflow-y-auto h-[275px] hide-scrollbar z-20 relative'>
      {data?.slice(3).map((user, index, userData) => (
        <LeaderboardListCard
          key={index}
          name={user.name}
          number={index + 4}
          level={user.level}
          cadreType={user.cadreType}
          cadreTitle={user.cadreTitle}
          percentageCompleted={user.percentageCompleted}
          profileSrc={user.profileImage}
          lastElementRef={userData.length - 1 == index ? lastElementRef : null}
        />
      ))}
      {data?.slice(3).length == 0 && !loading && <p>No data Found</p>}
      {loading && <h6 className='my-2 ms-3'>Loading ...</h6>}
    </div>
  );
};
