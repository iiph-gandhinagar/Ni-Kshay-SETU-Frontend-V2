import {
  CircleCheckSvg,
  DoctorProfile,
} from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { generateQueryString } from '@nikshay-setu-v3-monorepo/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const FilterData = [
  { label: 'All', value: null },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Resolved', value: 'completed' },
  { label: 'Transfer Query', value: 'Transfer Query' },
  { label: 'My Response', value: 'My Response' },
];

const checkFilters = {
  DRTB: ['In Progress', 'Resolved', 'All'],
  NODAL: ['In Progress', 'Resolved', 'All', 'Transfer Query', 'My Response'],
  COE: ['All'],
};

export const TrackQuery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { error, data, loadingApis } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const [mergedData, setMergedData] = useState([]);
  const existingIds = useRef(new Set());
  const observer = useRef<any>(null);

  const [query, setQuery] = useState({
    currentPage: 1,
    filterOption: null,
    isHistory: location.state.showHistory,
    userId: location.state.subscriberId,
    isLoading: false,
  });

  const canRaisedFilterActive =
    !(query?.filterOption === 'My Response') ||
    location.state?.userType === 'DRTB';
  const canRespondedByFilterActive =
    query?.filterOption === 'Transfer Query' ||
    query?.filterOption === 'My Response' ||
    location.state?.userType === 'NODAL';
  const canStatusFilterActive =
    location.state?.userType === 'DRTB' || !(query?.filterOption === 'All');

  const querySettings = {
    DRTB: {
      status: canStatusFilterActive && query?.filterOption,
      respondedBy: null,
      raisedBy: canRaisedFilterActive && location.state?.subscriberId,
    },
    NODAL: {
      status:
        !(query?.filterOption === 'Transfer Query') &&
        canStatusFilterActive &&
        !(query?.filterOption === 'My Response') &&
        query?.filterOption,
      respondedBy:
        !(query?.filterOption === 'Transfer Query') &&
        canRespondedByFilterActive &&
        location.state?.subscriberId,
      raisedBy:
        !(query?.filterOption === 'Transfer Query') &&
        canRaisedFilterActive &&
        location.state?.subscriberId,
      transferredInstitute:
        query?.filterOption === 'Transfer Query' &&
        location.state?.transferredInstitute,
    },
    COE: {
      status: canStatusFilterActive && query?.filterOption,
      respondedBy: location.state?.subscriberId,
      raisedBy: null,
    },
  };

  const fetchData = useCallback(async () => {
    if (query.isLoading) return;
    setQuery((prev) => ({ ...prev, isLoading: true }));

    try {
      const queryString = generateQueryString(
        ['page', query?.currentPage],
        ['status', querySettings?.[location.state?.userType]?.status],
        ['respondedBy', querySettings?.[location.state?.userType]?.respondedBy],
        ['raisedBy', querySettings?.[location.state?.userType]?.raisedBy],
        [
          'transferredInstitute',
          querySettings?.[location.state?.userType]?.transferredInstitute,
        ]
      );
      await dispatch(
        createAction({
          method: 'GET',
          url: 'QUERY_LIST',
          query: queryString,
        })
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setQuery((prev) => ({ ...prev, isLoading: false }));
    }
  }, [dispatch, query.currentPage, query.filterOption]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data?.query2coe?.query_list?.list) {
      const newData = data.query2coe.query_list.list.filter(
        (item) => !existingIds.current.has(item._id)
      );
      if (newData.length > 0) {
        setMergedData((prev) => [...prev, ...newData]);
        newData.forEach((item) => existingIds.current.add(item._id));
      }
    }
  }, [data]);

  const lastElementRef = useCallback(
    (node) => {
      if (query.isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (
            data?.query2coe?.query_list?.currentPage <
            data?.query2coe?.query_list?.totalPages
          ) {
            setQuery((prev) => ({
              ...prev,
              currentPage: prev.currentPage + 1,
            }));
          }
        }
      });

      if (node) observer.current.observe(node);
    },
    [
      data?.query2coe?.query_list?.currentPage,
      data?.query2coe?.query_list?.totalPages,
      query.isLoading,
    ]
  );

  const handleFilterChange = (selectedValue) => {
    setQuery((prev) => ({
      ...prev,
      filterOption: selectedValue,
      currentPage: 1,
    }));
    setMergedData([]);
    existingIds.current.clear();
  };
  const renderItem = (item, index) => {
    const isLastElement = index === mergedData.length - 1;

    const MetaData = {
      completed: { color: '#30D03F', text: 'Responded' },
      'In Progress': { color: '#D0A330', text: 'Respond to a query' },
      'Query Transfer': { color: '#008df6', text: 'Resolved' },
      undefined: { color: 'gray', text: 'Unknown status' },
    };

    const meta = MetaData[item.status] || MetaData.undefined;
    const isQueryTransfer = item?.status === 'Query Transfer';
    const isHistory =
      item?.respondedBy?._id === location.state?.subscriberId &&
      item?.status === 'completed';
    return (
      <div
        ref={isLastElement ? lastElementRef : null} // Attach observer to the last element
        onClick={() => {
          navigate('/Query', {
            state: {
              query: item,
              userType: location.state.userType,
              disableOption: true,
            },
          });
        }}
        className='border-b border-gray-300 h-20 px-4 py-3 relative bg-white hover:shadow-md transition-shadow'
      >
        {isHistory && (
          <span className='absolute right-1 top-0 text-sm font-semibold text-blue-500'>
            My Response
          </span>
        )}
        <div className='flex items-center gap-4'>
          <img
            src={DoctorProfile}
            className='h-14 w-14 rounded-full object-cover border border-gray-200'
            alt='user profile'
          />
          <div className='flex-grow'>
            <h6 className='text-lg font-semibold text-gray-800 leading-5 mb-1'>
              ({item.queryId}) {item.raisedBy.name}
            </h6>
            {item?.respondedBy?.name && (
              <div className='mt-1 text-sm text-gray-600'>
                <span className='font-medium'>Responded By:</span>{' '}
                {item.respondedBy.name}
              </div>
            )}
          </div>
          {item.status === 'completed' ? (
            <div className='flex items-center gap-2'>
              <img src={CircleCheckSvg} alt='Completed' className='h-5 w-5' />
              <div
                className='h-2 w-2 rounded-full'
                style={{ backgroundColor: meta.color }}
              ></div>
            </div>
          ) : isQueryTransfer ? (
            <>
              <div
                className='h-2 w-2 rounded-full'
                style={{ backgroundColor: meta.color }}
              ></div>
              <svg
                width='28'
                height='29'
                viewBox='0 0 28 29'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='text-gray-500'
              >
                <path
                  d='M10.5 22.8652L16.5453 16.8199C17.7169 15.6483 17.7169 13.7488 16.5453 12.5772L10.5 6.5319'
                  stroke='currentColor'
                  strokeWidth='2'
                />
              </svg>
            </>
          ) : (
            <>
              <div
                className='h-2 w-2 rounded-full'
                style={{ backgroundColor: meta.color }}
              ></div>
              <svg
                width='28'
                height='29'
                viewBox='0 0 28 29'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='text-gray-500'
              >
                <path
                  d='M10.5 22.8652L16.5453 16.8199C17.7169 15.6483 17.7169 13.7488 16.5453 12.5772L10.5 6.5319'
                  stroke='currentColor'
                  strokeWidth='2'
                />
              </svg>
            </>
          )}
        </div>
      </div>
    );
  };
  return (
    <section className='pt-[48px] pb-[58px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='mb-[24px] bg-gradient-to-r from-[#61C9EF] from-12% to-[#0B4E67] to-100% py-[18px] px-[20px]'>
          <div className='flex gap-[12px] items-center'>
            <div className='bg-[#2A7B9842] rounded-full h-[30px] w-[30px] flex justify-center items-center text-white text-[18px] font-medium'>
              {data?.query2coe?.query_list?.totalItems}
            </div>
            <div className='relative'>
              <select
                className='appearance-none bg-transparent text-white text-2xl font-medium px-4 py-2 pr-12 rounded-lg focus:outline-none cursor-pointer w-full'
                onChange={(e) => {
                  handleFilterChange(e.target.value);
                }}
              >
                {FilterData?.filter((v) =>
                  checkFilters?.[location.state?.userType]?.includes(v?.label)
                ).map((item) => (
                  <option
                    key={item.label}
                    value={item?.value}
                    className='text-gray-900 bg-white text-[18px]'
                  >
                    {item.label}
                  </option>
                ))}
              </select>

              <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
                <svg
                  width='28'
                  height='28'
                  viewBox='0 0 28 28'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M5.83398 10.5L11.8793 16.5453C13.0509 17.7169 14.9504 17.7169 16.122 16.5453L22.1673 10.5'
                    stroke='white'
                    strokeWidth='2'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-[24px] overflow-auto h-screen custom-scrollbar'>
          {mergedData.length === 0 && query.isLoading && <div>Loading...</div>}
          {mergedData.map((item, index) => renderItem(item, index))}
        </div>
      </div>
    </section>
  );
};
