import {
  CloseGradientSvg,
  LeftArrowSvg,
  LogoutWhiteSvg,
  MenuSvg,
  SkipSvg,
  TranslateSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { default as logo, default as newLogo } from '../../public/newLogo.svg';
import { useLanguageObject } from '../../utils/HelperHooks';
import { MenuBtn } from '../Buttons/Btns';
import { WhatsNewModal } from '../WhatsNew/WhatsNewModal';
interface NavbarProps {
  logoTitle?: string;
  logoSubtitle?: string;
}
export const Navbar: React.FC<NavbarProps> = ({
  logoTitle = '',
  logoSubtitle = '',
}) => {
  const [whatsNewModal, setWhatsNewModal] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location?.pathname === path;
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const loggedIn = cookies.get('token');
  return (
    <nav className='bg-white pt-4'>
      <div className='container flex flex-wrap items-center justify-between mx-auto py-1.5 relative'>
        <div className='relative flex items-center w-full'>
          <div className='flex flex-1 justify-between items-center'>
            <Link
              to={'/'}
              className='flex items-center space-x-[12px] rtl:space-x-reverse'
            >
              <img src={logo} alt='Ni-kshay Logo' />
              <div className='sm:flex flex-col hidden'>
                <span className='text-[18px] font-jakarta font-extrabold leading-[21.6px] -tracking-[0.64px]'>
                  {logoTitle}
                </span>
                <span className='text-[12px] font-jakarta text-darkSilver font-semibold leading-[19.2px]'>
                  {logoSubtitle}
                </span>
              </div>
            </Link>
            <div className='inset-y-0 left-0 flex items-center lg:hidden'>
              <MenuBtn onClick={() => setToggle(!toggle)} />
            </div>
            <div className='hidden lg:block mx-auto'>
              <div className='flex space-x-4 xl:space-x-8'>
                <Link
                  to={'/dashboard'}
                  className={`-tracking-[0.32px] px-3 xl:px-6 py-2 leading-[24px] font-semibold hover:text-PINK_F18282 ${
                    isActive('/dashboard')
                      ? 'text-PINK_F18282'
                      : 'text-darkSilver'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to={'/blogs'}
                  className={`-tracking-[0.32px] px-3 xl:px-6 py-2 leading-[24px] font-semibold hover:text-PINK_F18282 ${
                    isActive('/blogs') ? 'text-PINK_F18282' : 'text-darkSilver'
                  }`}
                >
                  Editorials
                </Link>
                <Link
                  to={'/about-us'}
                  className={`-tracking-[0.32px] px-3 xl:px-6 py-2 leading-[24px] font-semibold hover:text-PINK_F18282 ${
                    isActive('/about-us')
                      ? 'text-PINK_F18282'
                      : 'text-darkSilver'
                  }`}
                >
                  About us
                </Link>
                <Link
                  onClick={() => setWhatsNewModal(true)}
                  to={'#'}
                  className='-tracking-[0.32px] px-3 xl:px-6 py-2 leading-[24px] font-semibold hover:text-PINK_F18282 text-darkSilver'
                >{`What’s  new`}</Link>
              </div>
            </div>
          </div>
        </div>

        {toggle ? (
          <div
            className='lg:hidden w-full absolute inset-x-0 top-full mt-1 z-50 bg-white'
            id='mobile-menu'
          >
            <div className='space-y-1 pb-3 pt-2'>
              <Link
                to={'/dashboard'}
                className={`-tracking-[0.32px] block px-3 py-2 text-base font-semibold ${
                  isActive('/dashboard')
                    ? 'text-PINK_F18282'
                    : 'text-darkSilver'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to={'/blogs'}
                className={`-tracking-[0.32px] block px-3 py-2 text-base font-semibold ${
                  isActive('/blogs') ? 'text-PINK_F18282' : 'text-darkSilver'
                }`}
              >
                Editorials
              </Link>
              <Link
                to={'/about-us'}
                className={`-tracking-[0.32px] block px-3 py-2 text-base font-semibold ${
                  isActive('/about-us') ? 'text-PINK_F18282' : 'text-darkSilver'
                }`}
              >
                About us
              </Link>
              <Link
                onClick={() => setWhatsNewModal(true)}
                to={'#'}
                className='-tracking-[0.32px] block px-3 py-2 text-base font-semibold text-darkSilver'
              >{`What’s  new`}</Link>
              <div className='px-3 py-2'>
                <div className='bg-green flex items-center justify-center rounded-[19px] w-[48px] h-[48px]'>
                  <img src={LogoutWhiteSvg} alt='Logout' />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <WhatsNewModal
        onClose={() => setWhatsNewModal(false)}
        isOpen={whatsNewModal}
      />
    </nav>
  );
};

interface Navbar2Props {
  logoTitle?: string;
  logoSubtitle?: string;
  isCollapsed?: boolean;
  setIsCollapsed?: (() => void) | undefined;
  setSideBarToggled?: (() => void) | undefined;
}
export const Navbar2: React.FC<Navbar2Props> = ({
  logoTitle = '',
  logoSubtitle = '',
  isCollapsed = false,
  setIsCollapsed = () => null,
  setSideBarToggled = () => null,
}) => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  const [langKey, getText, objectToValue] = useLanguageObject();

  const isActive = (path: string) => location?.pathname === path;
  return (
    <nav className='bg-white pt-4'>
      <div className='container flex flex-wrap items-center justify-between mx-auto py-[1px] relative'>
        <div className='relative flex items-center w-full'>
          <div className='flex flex-1 justify-between items-center'>
            <div className='flex items-center'>
              <div className='lg:hidden pr-3'>
                <div
                  className='bg-[#FAFAFA] flex items-center justify-center rounded-[19px] w-[48px] h-[48px]'
                  onClick={setSideBarToggled}
                >
                  <img src={MenuSvg} alt='menu' />
                </div>
              </div>
              <Link
                to={'/'}
                className='flex items-center space-x-[12px] rtl:space-x-reverse'
              >
                <img
                  src={newLogo}
                  alt='Ni-kshay Logo'
                  className='w-12 xl:w-auto'
                />
                <div className='sm:flex flex-col hidden'>
                  <span className='text-[18px] font-jakarta font-extrabold leading-[21.6px] -tracking-[0.64px]'>
                    {logoTitle}
                  </span>
                  <span className='text-[12px] font-jakarta text-darkSilver font-semibold leading-[19.2px]'>
                    {logoSubtitle}
                  </span>
                </div>
              </Link>
            </div>
            <div className='inset-y-0 left-0 flex items-center lg:hidden'>
              <MenuBtn onClick={() => setToggle(!toggle)} />
            </div>
            <div className='hidden lg:block mx-auto'>
              <div className='flex space-x-3 xl:space-x-8'>
                <Link
                  to={'/home'}
                  className={`-tracking-[0.32px] px-3 xl:px-6 py-2 leading-[24px] font-semibold hover:text-PINK_F18282 ${
                    isActive('/home') ? 'text-PINK_F18282' : 'text-darkSilver'
                  }`}
                >
                  {getText('APP_HOME')}
                </Link>
                <Link
                  to={'/leaderboard'}
                  className={`-tracking-[0.32px] px-3 xl:px-6 py-2 leading-[24px] font-semibold hover:text-PINK_F18282 ${
                    isActive('/leaderboard')
                      ? 'text-PINK_F18282'
                      : 'text-darkSilver'
                  }`}
                >
                  {getText('APP_LEADERBOARD')}
                </Link>
                <Link
                  to={'/account'}
                  className={`-tracking-[0.32px] px-3 xl:px-6 py-2 leading-[24px] font-semibold hover:text-PINK_F18282 ${
                    isActive('/account')
                      ? 'text-PINK_F18282'
                      : 'text-darkSilver'
                  }`}
                >
                  {getText('APP_ACCOUNT')}
                </Link>
              </div>
            </div>
          </div>
          <div className='hidden lg:block'>
            <div className='flex gap-4'>
              {/* <Searchbar placeholder='Search...' /> */}
              <Link
                to={'/ApplicationLanguage'}
                className='bg-[#FAFAFA] flex items-center justify-center rounded-[19px] w-[48px] h-[48px]'
              >
                <img
                  src={TranslateSvg}
                  alt='translate'
                  className='w-[28px] h-[28px]'
                />
              </Link>
              {/* <div className='bg-[#FAFAFA] flex items-center justify-center rounded-[19px] w-[48px] h-[48px]'>
                <img src={BellIconSvg} alt='bell' />
              </div> */}
              {isCollapsed ? (
                <div
                  className='bg-[#FAFAFA] flex items-center justify-center rounded-[19px] w-[48px] h-[48px] cursor-pointer'
                  onClick={setIsCollapsed}
                >
                  <img src={MenuSvg} alt='menu' />
                </div>
              ) : (
                <div className='cursor-pointer' onClick={setIsCollapsed}>
                  <img
                    src={CloseGradientSvg}
                    alt='Close Menu'
                    width={48}
                    height={48}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {toggle ? (
          <div
            className='lg:hidden w-full absolute inset-x-0 top-full mt-1 z-50 bg-white'
            id='mobile-menu'
          >
            <div className='space-y-1 pb-3 pt-2'>
              <Link
                to={'/home'}
                className={`-tracking-[0.32px] block px-3 py-2 text-base font-semibold ${
                  isActive('/home') ? 'text-PINK_F18282' : 'text-darkSilver'
                }`}
              >
                {getText('APP_HOME')}
              </Link>
              <Link
                to={'/leaderboard'}
                className={`-tracking-[0.32px] block px-3 py-2 text-base font-semibold ${
                  isActive('/leaderboard')
                    ? 'text-PINK_F18282'
                    : 'text-darkSilver'
                }`}
              >
                {getText('APP_LEADERBOARD')}
              </Link>
              <Link
                to={'/account'}
                className={`-tracking-[0.32px] block px-3 py-2 text-base font-semibold ${
                  isActive('/account') ? 'text-PINK_F18282' : 'text-darkSilver'
                }`}
              >
                {getText('APP_ACCOUNT')}
              </Link>
              {/* <div className='px-3 py-2'>
                <Searchbar placeholder='Search...' />
              </div> */}
              <div className='px-3 py-2'>
                <Link
                  to={'/ApplicationLanguage'}
                  className='bg-[#FAFAFA] flex items-center justify-center rounded-[19px] w-[48px] h-[48px]'
                >
                  <img src={TranslateSvg} alt='translate' />
                </Link>
              </div>
              {/* <div className='px-3 py-2'>
                <div className='bg-[#FAFAFA] flex items-center justify-center rounded-[19px] w-[48px] h-[48px]'>
                  <img src={BellIconSvg} alt='bell' />
                </div>
              </div> */}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export const QuizNavBar = () => {
  return (
    <div className='container flex flex-wrap items-center justify-between h-[85px] mx-auto'>
      <button type='button' className='flex gap-[10px] items-center'>
        <img src={LeftArrowSvg} alt='' />
        <h4 className='text-[20px] lg:text[24px] font-medium bg-gradient-to-b from-[#4B5F83] to-[#B1BED4] !text-transparent bg-clip-text'>
          Field Staff Assessment on NTEP
        </h4>
      </button>
      <button className='font-medium flex gap-[2px] items-center'>
        Skip <img src={SkipSvg} alt='' />
      </button>
    </div>
  );
};
