import { languagesList } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { AppConfigDetails } from '@nikshay-setu-v3-monorepo/types';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useLanguageObject } from '../../utils/HelperHooks';

export const ApplicationLanguage = () => {
  const [langKey, getText] = useLanguageObject();
  const [activeLanguage, setActiveLanguage] = useState(langKey);

  const cookies = new Cookies();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      createAction<null, AppConfigDetails>({
        method: 'GET',
        url: 'APP_CONFIG_DETAILS',
      })
    );
  }, [activeLanguage]);

  const handleLanguageChange = (code: string) => {
    setActiveLanguage(code);
    // store next 1 year
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    cookies.set('lang', code, {
      expires,
    });
  };

  return (
    <div className='p-8'>
      <h2 className='text-xl font-semibold mb-6'>
        {getText('DRAWER_APP_LANG')}
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {languagesList.map((lang) => (
          <div
            key={lang.code}
            className='relative bg-[#f9f9ff] rounded-lg p-4 cursor-pointer'
            onClick={() => handleLanguageChange(lang.code)}
          >
            <div className='absolute top-4 right-4'>
              <input
                type='radio'
                name='language'
                value={lang.code}
                className='h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                checked={lang.code === activeLanguage}
              />
            </div>
            <div className='mb-2 flex items-center justify-center'>
              <div className='bg-white h-[33px] w-[33px] rounded-md flex justify-center items-center'>
                <span className='text-lg ' style={{ color: lang.color }}>
                  {lang.icon}
                </span>
              </div>
            </div>
            <div>
              <p className='font-medium text-gray-900 text-center'>
                {lang.language}
              </p>
              <p className='text-sm text-gray-500 text-center'>
                {lang.engName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
