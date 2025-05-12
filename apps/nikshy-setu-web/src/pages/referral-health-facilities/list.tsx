import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  HealthFacility,
  HealthFacilityList,
} from '@nikshay-setu-v3-monorepo/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckSvg from '../../assets/svg/CheckSvg';
import SortingArrow from '../../assets/svg/SortingArrow';
import { ReferralHealthFacilitiesCard } from '../../components/Cards/ReferralHealthFacilitiesCard';
import { useLanguageObject } from '../../utils/HelperHooks';

export function useListData(pageNumber) {
  const [render, setRender] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState<HealthFacility[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const apiData = useRef({ loadedPage: [] });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!apiData.current.loadedPage.includes(pageNumber)) {
      apiData.current.loadedPage.push(pageNumber);
      setLoading(true);

      dispatch(
        createAction<unknown, HealthFacilityList>(
          {
            method: 'GET',
            url: 'REFERRAL_HEALTH_FACILITY',
            query: location.search.slice(1) + `&page=${pageNumber}`,
          },
          (status, res) => {
            if (status == 200 && res && Array.isArray(res?.list)) {
              setListData((prevList) => [...prevList, ...res.list]);
              setHasMore(res.totalPages > pageNumber);
              setLoading(false);
            }
          }
        )
      );
    }
  }, [pageNumber, render]);

  // helper
  const reset = () => {
    setListData([]);
    setHasMore(false);
    setRender(new Date().getTime());
    apiData.current.loadedPage = [];
  };

  return { loading, listData, hasMore, reset };
}

const ReferralHealthFacilitiesList = () => {
  const pageUrl = new URL(window.location.href);

  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    pageUrl.searchParams.get('healthFacilityCode') ?? ''
  );
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | string>(
    pageUrl.searchParams.get('sortOrder') ?? 'asc'
  );
  const toggleSortingMenu = () => {
    setIsSortingOpen(!isSortingOpen);
  };

  const navigate = useNavigate();
  const [langKey, getText, objectToValue] = useLanguageObject();

  const rerenderPage = ({
    sortValue = sortBy,
    searchValue = searchTerm,
  }: undefined | { sortValue?: typeof sortBy; searchValue?: string }) => {
    // clear last data
    reset();

    const pageUrl = new URL(window.location.href);
    pageUrl.searchParams.set('sortOrder', sortValue);
    pageUrl.searchParams.set('healthFacilityCode', searchValue);

    navigate(`${pageUrl.pathname}${pageUrl.search}`, {
      replace: true,
    });
  };

  const handleSort = (sortValue: typeof sortBy) => {
    if (sortBy !== sortValue) {
      setSortBy(sortValue);
      setIsSortingOpen(false);
      rerenderPage({ sortValue });
    }
  };

  // new
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, hasMore, listData, reset } = useListData(currentPage);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <section className='pt-[48px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='relative mb-4'>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              rerenderPage({ searchValue: searchTerm });
            }}
          >
            <div className='flex items-center px-4 bg-gray-100 rounded-2xl w-full py-[7px]'>
              <input
                type='text'
                placeholder={getText('APP_SEARCH')}
                className='p-2 w-full rounded-2xl bg-gray-100 outline-none'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* <button className='p-2 ' type='button' onClick={toggleSortingMenu}>
              <img src={FilterSvg} alt='Filter' />
              </button> */}
              <button className='p-2' type='button' onClick={toggleSortingMenu}>
                <SortingArrow />
              </button>
            </div>
          </form>

          {isSortingOpen && (
            <div className='absolute top-full right-3 bg-white rounded-md shadow-lg z-10 p-4 w-fit'>
              <div
                className='sorting-option flex items-center space-x-2 px-3 py-2 rounded cursor-pointer hover:bg-gray-100'
                onClick={() => {
                  handleSort('asc');
                }}
                role='button'
              >
                {sortBy === 'asc' && <CheckSvg />}
                <p className='text-gray-800'>Name (A -Z)</p>
              </div>
              <div
                className='sorting-option flex items-center space-x-2 px-3 py-2 rounded cursor-pointer hover:bg-gray-100'
                onClick={() => {
                  handleSort('desc');
                }}
                role='button'
              >
                {sortBy === 'desc' && <CheckSvg />}
                <p className='text-gray-800'>Name (Z - A)</p>
              </div>
            </div>
          )}
        </div>
        <div className='bg-[#F3F5F6] p-[16px] md:p-[24px] pb-0  min-h-[400px] rounded-t-2xl mt-[28px] space-y-[28px]'>
          {listData.map((data: HealthFacility, index) => {
            return (
              <ReferralHealthFacilitiesCard
                lastElementRef={lastElementRef}
                {...{ ...data }}
                key={data._id}
              />
            );
          })}

          {listData.length == 0 && !loading && (
            <p>{getText('APP_NO_DATA_FOUND')}</p>
          )}

          {loading && <h6 className='my-2 ms-3'>{getText('APP_LOADING')}</h6>}
        </div>
      </div>
    </section>
  );
};

export default ReferralHealthFacilitiesList;
