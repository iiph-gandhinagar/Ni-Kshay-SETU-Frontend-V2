import { useState } from 'react';
import { BorderedInput } from '../Inputs/FormInput';
import { StepComponentProps } from './LoginModal';

export const MobileAndEmail: React.FC<StepComponentProps> = ({
  formik,
  state,
  dispatchState,
}) => {
  return (
    <div className=''>
      <div>
        {state.contactMethod === 'Mobile' ? (
          <BorderedInput
            focus={true}
            id='mobile-no'
            name='phoneNo'
            label='Mobile number*'
            isMobile
            value={formik.values?.phoneNo}
            onChange={formik.handleChange}
            type='number'
            touched={formik.touched?.phoneNo}
            errors={formik.errors?.phoneNo}
            onBlur={formik.handleBlur}
          />
        ) : (
          <BorderedInput
            focus={true}
            id='email'
            name='email'
            type='email'
            label='Email Address'
            value={formik.values?.email}
            touched={formik.touched?.email}
            errors={formik.errors?.email}
            onChange={formik.handleChange}
          />
        )}
      </div>
    </div>
  );
};

export const MobileAndEmailTab = ({ formik, state, dispatchState }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Mobile', 'Email'];
  const showTabs =
    (state.isLogin && state.progress !== 0.3) ||
    (!state.isLogin && state.progress == '0.3');
  return (
    <div className='relative mb-[24px]'>
      <div className='inline-flex space-x-2 border-[0.5px] border-D9DBDB rounded-[12px] '>
        {showTabs &&
          tabs?.map((tab, index) => (
            <div
              key={index}
              onClick={() => {
                formik.resetForm();
                dispatchState({
                  type: 'SET_CONTACT_METHOD',
                  payload: tabs[index] as 'Mobile' | 'Email',
                });
                setActiveTab(index);
              }}
              className={`relative py-[16px] px-5 sm:px-10 text-[18px] leading-4 font-medium rounded-[12px] cursor-pointer ${
                activeTab === index ? 'bg-darkBlue' : 'bg-white'
              } ${activeTab === index ? 'text-white' : 'text-black'}`}
            >
              {tab}
            </div>
          ))}
      </div>
    </div>
  );
};
