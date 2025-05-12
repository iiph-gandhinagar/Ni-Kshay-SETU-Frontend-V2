import {
  aboutUsPng,
  contactUsPng,
  DefaultProfileSvg,
  faqPng,
  FolderIconSvg,
  KnowledgeBaseBlackSvg,
  ManageTbSvg,
  PatientManagementToolPng,
  privacyPolicyPng,
} from '@nikshay-setu-v3-monorepo/assets';
import { STORE_URL } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { useLanguageObject } from 'apps/nikshy-setu-web/src/utils/HelperHooks';
import { useEffect, useMemo, useState } from 'react';
import { Cookies } from 'react-cookie';
import { Menu, Sidebar, sidebarClasses } from 'react-pro-sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import { Icon } from '../../Icon/Icon';
import { ListItem } from './ListItem';
import './sidebar.css';
import { UserDetails } from './UserDetails';
interface SideBarProps {
  toggled?: boolean;
  isCollapsed?: boolean;
  setBroken?: ((broken: boolean) => void) | undefined;
  onBackdropClick?: (() => void) | undefined;
}

export const SideBar: React.FC<SideBarProps> = ({
  toggled = false,
  isCollapsed = false,
  setBroken,
  onBackdropClick = () => null,
}) => {
  const [selected, setSelected] = useState('');
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1280px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  const user = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.user_profile
  );
  const homeRoutes = useSelector(
    (state: RootReducerStates) =>
      state.appContext.data?.homeScreen?.home_page_info?.plugins
  );
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [langKey, getText, objectToValue] = useLanguageObject();
  const navigate = useNavigate();

  // langKeyForPlugin[title] ? getText(langKeyForPlugin[title]) : title

  useEffect(() => {
    dispatch(
      createAction<null, null>({
        method: 'GET',
        url: 'HOME_PAGE_INFO',
      })
    );

    dispatch(
      createAction<null, UserProfileApiResponse>({
        method: 'GET',
        url: 'USER_PROFILE',
        query: cookies.get('userId'),
      })
    );
  }, []);

  const homeRoutesObject = useMemo(() => {
    return (homeRoutes ?? []).reduce((acc, obj) => {
      acc[obj.title] = obj;
      return acc;
    }, {});
  }, [homeRoutes]);

  const userProfileImage =
    (user?.profileImage && STORE_URL + user?.profileImage) || DefaultProfileSvg;

  return (
    <div className='lg:pt-[48px] '>
      <Sidebar
        collapsedWidth='68px'
        width={isDesktopOrLaptop ? '450px' : '320px'}
        collapsed={isCollapsed}
        toggled={toggled}
        customBreakPoint='1023px'
        onBreakPoint={setBroken}
        onBackdropClick={onBackdropClick}
        rootStyles={{
          border: 0,
          [`.${sidebarClasses.container}`]: {
            background: isCollapsed
              ? `linear-gradient(#F1F1F14d 0%, #ECECEC4d 100%) hide-scrollbar `
              : '#F8FAFF',
            borderRadius: isCollapsed ? 20 : isTabletOrMobile ? 0 : 28,
            padding: isCollapsed ? 10 : isTabletOrMobile ? 16 : 28,
          },
        }}
        className='pro-sidebar hide-scrollbar lg:!sticky lg:top-0'
        style={{
          overflow: 'hidden',
        }}
      >
        <Menu
          className='hide-scrollbar'
          style={{
            overflowY: 'auto', // Allow scrolling inside Menu if needed
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
          }}
          menuItemStyles={{
            button: ({ active }) => {
              return {
                backgroundColor: active ? '#ffffff' : undefined,
                borderRadius: 12,
                justifyContent: isCollapsed ? 'center' : 'start',
                padding: 12,
                height: isCollapsed ? 48 : 50,
              };
            },
          }}
        >
          {isCollapsed ? (
            <ListItem
              title='User Details'
              to='/account'
              icon={
                <img
                  src={userProfileImage}
                  alt='User'
                  style={{ height: 30, width: 30, borderRadius: '100%' }}
                />
              }
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          ) : (
            <UserDetails key={isCollapsed} name='User' />
          )}
          <div
            className={
              isCollapsed
                ? 'space-y-4 mt-4'
                : 'bg-white mt-[28px] rounded-2xl p-4'
            }
          >
            {homeRoutesObject['Knowledge Connect'] && (
              <ListItem
                title='Knowledge Connect'
                to='/knowledge-connect'
                icon={<img src={KnowledgeBaseBlackSvg} alt='Knowledge Base' />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
              />
            )}
            {homeRoutesObject['Knowledge Quiz'] && (
              <ListItem
                title='Knowledge Quiz'
                to='/KnowledgeAssessments'
                icon={
                  <Icon
                    title='Knowledge Quiz'
                    width={isCollapsed ? 30 : 24}
                    height={isCollapsed ? 30 : 24}
                  />
                }
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
              />
            )}
            {homeRoutesObject['ManageTB India'] && (
              <ListItem
                title='ManageTB India'
                to='/manage-tb'
                icon={<img src={ManageTbSvg} alt='Manage TB India' />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
              />
            )}
            {homeRoutesObject['Query2COE'] && (
              <ListItem
                title='Query2COE'
                to='/query-response-management'
                icon={
                  <Icon
                    title='Query2COE'
                    width={isCollapsed ? 30 : 24}
                    height={isCollapsed ? 30 : 24}
                  />
                }
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
              />
            )}
          </div>
          <div
            className={
              isCollapsed
                ? 'space-y-4 mt-4'
                : 'bg-white mt-[28px] rounded-2xl p-4'
            }
          >
            <ListItem
              title='Screening Tool'
              to='/screening-tool'
              icon={
                <Icon
                  title='Screening Tool'
                  width={isCollapsed ? 30 : 24}
                  height={isCollapsed ? 30 : 24}
                />
              }
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <ListItem
              title='Patient Management'
              to='/more'
              icon={
                <img
                  src={PatientManagementToolPng}
                  alt='Patient Management Tool'
                />
              }
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <ListItem
              title='Resource Materials'
              to='/more'
              icon={<img src={FolderIconSvg} alt='Resource Materials' />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <ListItem
              title='Referral Health Facility'
              to='/referral-health-facilities'
              icon={
                <Icon
                  title='Referral Health Facility'
                  width={isCollapsed ? 30 : 24}
                  height={isCollapsed ? 30 : 24}
                />
              }
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <ListItem
              title='Survey Form'
              to='/survey'
              icon={
                <Icon
                  title='Survey Form'
                  width={isCollapsed ? 30 : 24}
                  height={isCollapsed ? 30 : 24}
                />
              }
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </div>
          <div
            className={
              isCollapsed
                ? 'space-y-4 mt-4'
                : 'bg-white mt-[28px] rounded-2xl py-[16px] px-[24px]'
            }
          >
            <ListItem
              title='About us'
              to='/about-us'
              icon={<img src={aboutUsPng} alt='About us' />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <ListItem
              title='Privacy Policy & Disclaimer'
              to='/privacy-policy'
              icon={
                <img src={privacyPolicyPng} alt='Privacy Policy & Disclaimer' />
              }
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <ListItem
              title='Contact us'
              to='/contact-us'
              icon={<img src={contactUsPng} alt='Contact us' />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <ListItem
              title='FAQs'
              to='/about-us#faq'
              icon={<img src={faqPng} alt='FAQs' />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </div>
          <div
            className={
              isCollapsed
                ? 'space-y-4 mt-4'
                : 'bg-white mt-[28px] rounded-2xl py-[16px] px-[24px]'
            }
          >
            <ListItem
              title='Sign Out'
              icon={
                <Icon
                  stroke={isCollapsed ? '#495555' : '#394F89'}
                  title='Sign Out'
                  width={isCollapsed ? 30 : 24}
                  height={isCollapsed ? 30 : 24}
                />
              }
              selected={selected}
              setSelected={() => {
                cookies.remove('token');
                cookies.remove('userId');
                cookies.remove('goal');
                navigate('/');
              }}
              isCollapsed={isCollapsed}
            />
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};
