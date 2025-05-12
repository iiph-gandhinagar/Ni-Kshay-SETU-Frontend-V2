import { LinkSvg } from '@nikshay-setu-v3-monorepo/assets';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { BlogList } from 'shared/types/src/screens/BlogsTypes';
import { OverlayLoader } from '../../../components/Animations/Loader';
import Footer from '../../../components/Layouts/Footer';
import { Navbar } from '../../../components/Layouts/Navbar';

export const BlogsDetails = () => {
  const [blog, setBlog] = useState<BlogList>(undefined);
  const [loader, setLoading] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(
      createAction<null, BlogList>(
        {
          method: 'GET',
          url: 'GET_BLOG_BY_SLUG',
          query: params?.slug,
        },
        (res, data) => {
          setLoading(false);
          if (res == 200) setBlog(data);
        }
      )
    );
    return () => {
      setBlog(undefined);
    };
  }, []);
  return (
    <React.Fragment>
      <Navbar
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
      {loader && blog == undefined ? (
        <OverlayLoader />
      ) : (
        blog !== undefined && (
          <section className='pt-[48px] pb-[110px]'>
            <div className='container mx-auto'>
              <div className='max-w-[1140px] mx-auto'>
                <div className='text-center'>
                  <span className='text-[16px] leading-[24px] text-darkBlue'>
                    {moment(blog?.createdAt)?.format('MMMM DD, YYYY')}
                  </span>
                  <h2 className='text-3xl md:text-[48px] font-bold -tracking-[0.32px] md:leading-[60px]'>
                    {blog?.title?.en}
                  </h2>
                  <p className='mt-[16px] font-medium text-darkSilver leading-6'>
                    {' '}
                    Editorials Description
                  </p>
                </div>
                <div className='relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] mt-[58px]'>
                  <img
                    src={process.env.NX_PUBLIC_STORE_URL + blog?.image1}
                    alt={blog?.slug}
                    className='w-full h-full object-fill rounded-xl'
                  />
                </div>
                <div
                  className='mt-[16px] font-medium text-darkSilver prose prose-sm sm:prose-base md:prose-lg lg:prose-xl xl:prose-2xl'
                  dangerouslySetInnerHTML={{
                    __html: blog?.description?.en || '',
                  }}
                />
                {blog?.source && (
                  <Link to={blog?.source} target='_blank'>
                    <div className='flex items-center gap-[4px] mt-[12px]'>
                      <h6 className='font-medium text-[18px] text-darkBlue leading-[28px]'>
                        — Source:{' '}
                      </h6>
                      <img src={LinkSvg} alt='Link' />
                    </div>
                  </Link>
                )}
                <hr className='border-[#EEF0F3] mt-[26px]' />
              </div>
            </div>
          </section>
        )
      )}
      <Footer
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
    </React.Fragment>
  );
};
