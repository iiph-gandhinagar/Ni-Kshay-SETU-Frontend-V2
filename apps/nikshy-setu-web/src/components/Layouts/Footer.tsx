import {
  FacebookWhiteSvg,
  InstagramFillSvg,
  TwitterWhiteSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { Link, NavLink } from 'react-router-dom';
import { default as logo } from '../../public/FooterLogo.svg';
import { OutLineBtn } from '../Buttons/Btns';

interface FooterProps {
  logoTitle?: string;
  logoSubtitle?: string;
}

const socialMediaLinks = [
  {
    name: 'Facebook',
    link: 'https://www.facebook.com/profile.php?id=100086461717566',
    svgIcon: FacebookWhiteSvg,
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/nikshaysetu/',
    svgIcon: InstagramFillSvg,
  },
  {
    name: 'Twitter',
    link: 'https://x.com/NikshaySetu',
    svgIcon: TwitterWhiteSvg,
  },
];

export const Footer: React.FC<FooterProps> = ({
  logoTitle = '',
  logoSubtitle = '',
}) => {
  return (
    <footer className='bg-FooterBg bg-no-repeat bg-cover'>
      <div className='container mx-auto'>
        <div className='flex flex-col items-center text-center py-[28px]'>
          <img src={logo} alt='Ni-kshay Logo' />
          <div className='flex flex-col mt-[12px]'>
            <span className='text-[18px] font-jakarta font-extrabold leading-[21.6px] -tracking-[0.64px] text-white'>
              {logoTitle}
            </span>
            <span className='text-[12px] font-jakarta text-PINK_F18282 font-semibold leading-[19.2px]'>
              {logoSubtitle}
            </span>
          </div>
          <h6 className='text-[18px] font-medium leading-[28px] text-white mt-[8px]'>
            Supported by : Indian Institute of Public Health, Gandhinagar
          </h6>
          <div className='flex flex-wrap gap-4 lg:gap-8 my-[28px] items-center justify-center'>
            <div className='flex gap-[18px] items-center flex-wrap'>
              <NavLink to={'/about-us'}>
                {({ isActive }) => {
                  return isActive ? (
                    <h6 className='text-[18px] font-bold leading-[28px] text-white '>
                      About Us
                    </h6>
                  ) : (
                    <OutLineBtn
                      title='About Us'
                      customClassName=' leading-[24px] !text-[16px] px-[12px] py-[8px] rounded-full h-8'
                    />
                  );
                }}
              </NavLink>
              <NavLink to={'/about-us#faq'}>
                {({ isActive }) => {
                  return (
                    <OutLineBtn
                      title='FAQ'
                      customClassName=' leading-[24px] !text-[16px] px-[12px] py-[8px] rounded-full h-8'
                    />
                  );
                }}
              </NavLink>
              <NavLink to={'/about-us#contact-us'}>
                {({ isActive }) => {
                  return (
                    <OutLineBtn
                      title='Contact Us'
                      customClassName=' leading-[24px] !text-[16px] px-[12px] py-[8px] rounded-full h-8'
                    />
                  );
                }}
              </NavLink>
            </div>
            <div className='flex gap-[18px] items-center flex-wrap'>
              <NavLink to={'/privacy-policy'}>
                {({ isActive }) => {
                  return isActive ? (
                    <h6 className='text-[18px] font-bold leading-[28px] text-white '>
                      Privacy Policy
                    </h6>
                  ) : (
                    <OutLineBtn
                      title='Privacy Policy'
                      customClassName=' leading-[24px] !text-[16px] px-[12px] py-[8px] rounded-full h-8'
                    />
                  );
                }}
              </NavLink>
              <NavLink to={'/disclaimer'}>
                {({ isActive }) => {
                  return isActive ? (
                    <h6 className='text-[18px] font-bold leading-[28px] text-white '>
                      Disclaimer
                    </h6>
                  ) : (
                    <OutLineBtn
                      title='Disclaimer'
                      customClassName=' leading-[24px] !text-[16px] px-[12px] py-[8px] rounded-full h-8'
                    />
                  );
                }}
              </NavLink>
            </div>
          </div>
          <div className='flex gap-[28px] items-center px-4 py-[12px] max-w-[277px] mx-auto'>
            {socialMediaLinks.map(({ name, link, svgIcon }) => (
              <Link target='_blank' to={link}>
                <img src={svgIcon} alt={name} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <hr className='border border-white' />
      <div className='container mx-auto'>
        <div className='flex flex-col sm:flex-row items-center sm:justify-between py-[24px]  text-white'>
          <span className='text-[12px] leading-4 font-medium'>
            © {new Date().getFullYear()} Flex. All rights reserved.
          </span>
          <span className='text-[12px] leading-4 font-medium'>
            Powered by Digiflux Technologies Pvt. Ltd.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
