import {
  AchievementsBronzeSvg,
  AchievementsGoldSvg,
  AchievementsSilverSvg,
  rocketAnimation,
} from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AchievementCard } from '../Cards/AchievementCard';

const achievementData = [
  {
    lanKey: 'LEVEL_BRONZE',
    name: 'Bronze',
    AchievementsCounter: 0,
    pendingAchievementsCounter: 5,
    icon: AchievementsBronzeSvg,
    fromBgColor: '#E29B2F',
    toBgColor: '#E29B2F80',
  },
  {
    lanKey: 'LEVEL_SILVER',
    name: 'Silver',
    AchievementsCounter: 0,
    pendingAchievementsCounter: 5,
    icon: AchievementsSilverSvg,
    fromBgColor: '#54545466',
    toBgColor: '#D8D8D8',
  },
  {
    lanKey: 'LEVEL_GOLD',
    name: 'Gold',
    AchievementsCounter: 0,
    pendingAchievementsCounter: 5,
    icon: AchievementsGoldSvg,
    fromBgColor: '#FECE2A',
    toBgColor: '#A6892566',
  },
];

export type AchievementCardData = (typeof achievementData)[0];

interface AchievementsTabProps {}
export const AchievementsTab: React.FC<AchievementsTabProps> = ({}) => {
  const { error, data, loadingApis } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const [achievement, setAchievement] = useState(achievementData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      createAction(
        {
          method: 'GET',
          url: 'ALL_ACHIEVEMENT_BY_LEVEL',
        },
        (code, res: any) => {
          if (code === 200) {
            if (res) {
              setAchievement((old) => {
                const newAchievement = [...old];
                newAchievement.forEach((item) => {
                  const newData = res.find(
                    ({ badgeName }) => badgeName == item.name
                  );
                  if (newData) {
                    item.AchievementsCounter = newData.totalAchievements;
                    item.pendingAchievementsCounter =
                      item.pendingAchievementsCounter -
                      item.AchievementsCounter;
                  }
                });

                return newAchievement;
              });
            }
          }
        }
      )
    );
  }, []);

  return (
    <div className='mb-12'>
      <div className='flex flex-col items-center mt-8'>
        <h6 className='font-semibold leading-[26.58px]'>Current Level</h6>
        <div className='max-w-full mt-1'>
          <Lottie
            animationData={rocketAnimation}
            loop={false}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <p className='text-center'> {data?.user_profile?.currentLevel}</p>
      </div>
      <div className='flex md:flex-row flex-col justify-center my-[58px] gap-x-[12px] gap-y-6'>
        {achievement.map((item, index) => {
          return <AchievementCard {...item} key={index} />;
        })}
      </div>
    </div>
  );
};
