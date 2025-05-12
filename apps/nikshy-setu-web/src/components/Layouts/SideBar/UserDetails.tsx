import { DefaultProfileSvg } from '@nikshay-setu-v3-monorepo/assets';
import { STORE_URL } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  CadresByTypesApiResponse,
  RootReducerStates,
} from '@nikshay-setu-v3-monorepo/types';
import { useLanguageObject } from 'apps/nikshy-setu-web/src/utils/HelperHooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface UserContext {
  queryDetails: {
    instituteId: string;
    type: {
      _id: string;
      name: string;
    };
    querySolved: number;
    isActive: boolean;
  };
  chatHotQuestionOffset: number;
  feedbackHistory: any[];
  _id: string;
  weeklyAssessmentCount: number;
}

export const UserDetails: React.FC<any> = () => {
  const [carderInfo, setCadreInfo] = useState<{
    isCadreDisable: boolean;
    cadreOption: CadresByTypesApiResponse;
  }>({
    isCadreDisable: true,
    cadreOption: [],
  });
  const user = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.user_profile
  );
  // const user = data?.user_profile;
  const dispatch = useDispatch();
  const [langKey, getText, objectToValue] = useLanguageObject();

  useEffect(() => {
    if (dispatch) {
      if (user && user.cadreType && carderInfo.cadreOption.length == 0) {
        dispatch(
          createAction<null, CadresByTypesApiResponse>(
            {
              method: 'GET',
              query: (user?.cadreType && user?.cadreType) || '',
              url: 'CADRES_BY_TYPES',
            },
            (code, res) => {
              if (Array.isArray(res)) {
                setCadreInfo({ cadreOption: res, isCadreDisable: false });
              }
            }
          )
        );
      }
    }
  }, []);
  return (
    <div>
      <div className='flex items-center gap-[12px]'>
        <img
          src={
            (user?.profileImage && STORE_URL + user?.profileImage) ||
            DefaultProfileSvg
          }
          alt='User'
          style={{ height: 40, width: 40, borderRadius: '100%' }}
        />
        <h6 className='text-darkBlue font-medium -tracking-[0.16px]'>
          {user?.name}
        </h6>
      </div>
      <div className='bg-white mt-[8px] rounded-2xl p-[16px]'>
        <div className='space-y-[8px]'>
          <h6 className='text-[18px] text-darkGray666666 leading-[22px]'>
            {getText('LABEL_MOBILE_NUM')}
          </h6>
          <h6 className='text-darkGray495555 font-medium leading-[41px]'>
            {user?.phoneNo}
          </h6>
        </div>
        <div className='space-y-[8px] my-4'>
          <h6 className='text-[18px] text-darkGray666666 leading-[22px]'>
            {getText('LABEL_CADRE_TYPE')}
          </h6>
          <h6 className='text-darkGray495555 font-medium leading-[24px]'>
            {user?.cadreType.replace('_', ' ')}
          </h6>
        </div>
        <div className='space-y-[8px]'>
          <h6 className='text-[18px] text-darkGray666666 leading-[22px]'>
            {getText('LABEL_CADRE')}
          </h6>
          <h6 className='text-darkGray495555 font-medium leading-[19.2px]'>
            {
              carderInfo?.cadreOption?.find((v) => v._id === user?.cadreId)
                ?.title
            }
          </h6>
        </div>
      </div>
    </div>
  );
};
