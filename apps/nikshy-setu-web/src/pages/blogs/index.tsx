import { createAction } from '@nikshay-setu-v3-monorepo/store';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AllBlogProps, BlogList } from 'shared/types/src/screens/BlogsTypes';
import { OverlayLoader } from '../../components/Animations/Loader';
import { BlogsListCard } from '../../components/Cards/BlogsListCard';
import Footer from '../../components/Layouts/Footer';
import { Navbar } from '../../components/Layouts/Navbar';

export const Blogs = () => {
  const [loader, setLoading] = useState(false);
  const [list, setList] = useState<BlogList[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(
      createAction<null, AllBlogProps>(
        {
          method: 'GET',
          url: 'GET_ALL_BLOGS',
        },
        (res, data) => {
          setLoading(false);
          if (res == 200) setList(data.list);
        }
      )
    );
    return () => {
      setList([]);
    };
  }, []);
  return (
    <React.Fragment>
      <Navbar
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
      <section className='pt-[46px]'>
        <div className='container mx-auto'>
          <div className='max-w-[1140px] mx-auto'>
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='mt-[16px] text-3xl md:text-[48px] font-bold -tracking-[0.32px] md:leading-[60px]'>
                  Editorials
                </h2>
                {/* <p className='mt-[16px] font-bold text-darkSilver leading-6'>
                  Editorials Description
                </p> */}
              </div>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-[58px] pt-[58px]  pb-20 lg:pb-[170px]'>
              {loader && list.length == 0 ? (
                <OverlayLoader />
              ) : (
                list
                  ?.filter((e) => e.active)
                  ?.sort((a, b) => a.orderIndex - b.orderIndex)
                  ?.map((item) => {
                    return (
                      <BlogsListCard
                        onClick={() => navigate('/blogs/' + item?.slug)}
                        key={item?._id}
                        date={moment(item?.createdAt).format('MMMM DD, YYYY')}
                        imgSrc={process.env.NX_PUBLIC_STORE_URL + item?.image3}
                        title={item?.title?.en || item?.slug}
                      />
                    );
                  })
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
    </React.Fragment>
  );
};
