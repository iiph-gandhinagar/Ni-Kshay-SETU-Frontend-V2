import {
  CompetentGoldSvg,
  ExpertGoldSvg,
  ProficientGoldSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { TopThreeUserType } from '@nikshay-setu-v3-monorepo/types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FadeDownAnimation,
  LeaderboardBarAnimation,
  PulseAnimation,
} from '../Animations/Animations';
import { LeaderboardUserCard } from '../Cards/LeaderboardUserCard';
import { LeaderboardBar } from './LeaderboardBar';
import { LeaderboardList } from './LeaderboardList';

interface LeaderboardTabProps {
  profile: any;
}
export const LeaderboardTab: React.FC<LeaderboardTabProps> = ({ profile }) => {
  const dispatch = useDispatch();
  const [users, setTopUser] = useState(undefined);

  // state
  const { data, loading, loadMore } = InfiniteScroll();
  const observer = useRef<IntersectionObserver | null>(null);

  // helper
  const lastElementRef = (node: any) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    dispatch(
      createAction<null, TopThreeUserType>(
        {
          method: 'GET',
          url: 'TOP_3_SUB_RANK',
        },
        (code, res) => {
          if (code === 200) {
            res?.sort((a, b) => a.completedTasks - b.completedTasks);
            res = [res[1], res[2], res[0]];
            setTopUser(res);
          }
        }
      )
    );
  }, []);

  // console.log(data.leaderboard.all_subscriber_progress.list)

  return (
    <div className='pb-4'>
      {users && (
        <div className='flex justify-center items-end bg-LeaderboardBgSvg bg-no-repeat bg-[center_bottom_-175px] mt-6 pt-16 -mb-6'>
          {users[0] && (
            <div className='flex flex-col gap-6 items-center'>
              <FadeDownAnimation delay={0.2}>
                <LeaderboardUserCard
                  cadreTitle={users[0]?.cadreTitle}
                  userSrc={users[0].profileImage}
                  medalSrc={ProficientGoldSvg}
                  name={users[0].name}
                  level={users[0].level}
                />
              </FadeDownAnimation>
              <LeaderboardBarAnimation delay={0.1}>
                <div className='flex flex-col gap-2 items-center'>
                  <PulseAnimation duration={1.3}>
                    <div className='py-2 px-[14px] rounded-[13.89px] bg-[#9288e790]'>
                      <h6 className='font-semibold -tracking-[0.16px] text-white'>
                        {users[0].percentageCompleted}%
                      </h6>
                    </div>
                  </PulseAnimation>
                  <LeaderboardBar
                    wrapperClassName='w-24 sm:w-[135px]'
                    verticalBarClassName='bg-gradient-to-b from-[#9087E4] to-[#A49BF4]'
                    barHeight={220}
                    label='2'
                    labelClassName='text-6xl md:text-8xl'
                  />
                </div>
              </LeaderboardBarAnimation>
            </div>
          )}
          {users[1] && (
            <div className='flex flex-col gap-6 items-center'>
              <FadeDownAnimation>
                <LeaderboardUserCard
                  cadreTitle={users[1]?.cadreTitle}
                  userSrc={users[1].profileImage}
                  medalSrc={ExpertGoldSvg}
                  name={users[1].name}
                  level={users[1].level}
                />
              </FadeDownAnimation>
              <LeaderboardBarAnimation>
                <div className='flex flex-col gap-2 items-center'>
                  <PulseAnimation duration={1.2}>
                    <div className='py-2 px-[14px] rounded-[13.89px] bg-[#9288e790]'>
                      <h6 className='font-semibold -tracking-[0.16px] text-white'>
                        {users[1].percentageCompleted}%
                      </h6>
                    </div>
                  </PulseAnimation>
                  <LeaderboardBar
                    wrapperClassName='w-24 sm:w-[145px]'
                    verticalBarClassName='bg-gradient-to-b from-[#938AE2] to-[#C1BDF0] shadow-custom-double'
                    barHeight={260}
                    label='1'
                    labelClassName='text-6xl md:text-9xl'
                  />
                </div>
              </LeaderboardBarAnimation>
            </div>
          )}
          {users[2] && (
            <div className='flex flex-col gap-6 items-center'>
              <FadeDownAnimation delay={0.3}>
                <LeaderboardUserCard
                  cadreTitle={users[2]?.cadreTitle}
                  userSrc={users[2].profileImage}
                  medalSrc={CompetentGoldSvg}
                  name={users[2].name}
                  level={users[2].level}
                />
              </FadeDownAnimation>
              <LeaderboardBarAnimation delay={0.4}>
                <div className='flex flex-col gap-2 items-center'>
                  <PulseAnimation duration={1.3}>
                    <div className='py-2 px-[14px] rounded-[13.89px] bg-[#9288e790]'>
                      <h6 className='font-semibold -tracking-[0.16px] text-white'>
                        {users[2].percentageCompleted}%
                      </h6>
                    </div>
                  </PulseAnimation>
                  <LeaderboardBar
                    wrapperClassName='w-24 sm:w-[135px]'
                    verticalBarClassName='bg-gradient-to-b from-[#9087E4] to-[#A49DE9]'
                    barHeight={180}
                    label='3'
                    labelClassName='text-6xl md:text-7xl'
                  />
                </div>
              </LeaderboardBarAnimation>
            </div>
          )}
        </div>
      )}
      {data && (
        <LeaderboardList
          data={data}
          lastElementRef={lastElementRef}
          loading={loading}
        />
      )}
    </div>
  );
};

const InfiniteScroll = () => {
  // state
  const [data, setData] = useState<[][]>([[]]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // get hook
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    // get chat history api
    dispatch(
      createAction(
        {
          method: 'GET',
          url: 'ALL_SUBSCRIBER_PROGRESS',
          query: `?page=${page}&limit=10`,
        },
        (statusCode: number, response) => {
          if (statusCode == 200) {
            const { list, currentPage, totalPages } = response as any;

            // set list index wise array
            setData((oldList) => {
              const newList = structuredClone(oldList);
              newList[currentPage] = list;
              return newList;
            });

            setLoading(false);
            setHasMore(totalPages > currentPage);
          }
        }
      )
    );
  }, [page]);

  function loadMore() {
    if (hasMore && loading == false) {
      setPage((old) => old + 1);
    }
  }

  return { data: data.flat(1), loadMore, loading };
};
