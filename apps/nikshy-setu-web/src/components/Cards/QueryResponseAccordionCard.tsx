import {
  AddBlackSvg,
  CloseSvg,
  RightArrowBlackSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
import { OutLineBtn } from '../Buttons/Btns';

interface QueryResponseAccordionCardProps {
  metaData: any;
  userType: any;
  data: any;
  loadingApis: string[];
}

export const QueryResponseAccordionCard = ({
  metaData,
  userType,
  data,
  loadingApis,
}: QueryResponseAccordionCardProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const [langKey, getText, objectToValue] = useLanguageObject();

  const toggleAccordion = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  if (
    loadingApis.includes('USER_PROFILE') ||
    loadingApis.includes('QUERY_LIST')
  ) {
    return (
      <div className='flex justify-center items-center h-40'>
        <div className='loader'>Loading...</div>
      </div>
    );
  }

  const queryList = data?.query2coe?.query_list?.list || [];

  if (queryList.length === 0) {
    return (
      <div className='text-center mt-5'>
        <h4 className='text-gray-500 mb-3 font-semibold'>
          {getText('APP_NO_DATA_FOUND')}
        </h4>
        <p className='font-bold'>{getText('Q2COE_INFO_CONTACT_IIPHG_TEAM')}</p>
      </div>
    );
  }

  return (
    <section className='pb-4'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='flex items-center gap-[8px] mb-[24px]'>
          <div className='rounded-full w-[30px] h-[30px] flex items-center justify-center text-[18px] text-[#409BBB] p-[6px] bg-[#2A7B9842]'>
            {queryList.length}
          </div>
          <h4 className='text-[18px] leading-[18px] md:leading-[31px] font-medium md:text-[24px] text-[#4D4D4D]'>
            {getText(metaData?.[userType]?.queryListTitle) ||
              'Queries pending for you to answer'}
          </h4>
        </div>

        <div className='flex flex-col gap-[20px]'>
          {queryList.map((query: any, index: number) => {
            const createdDate = new Date(query?.createdAt);
            const queryDate = `${createdDate.getUTCDate()}-${
              createdDate.getUTCMonth() + 1
            }-${createdDate.getUTCFullYear()}`;

            // Determine border color based on status
            const statusBorderColor =
              query.status === 'completed'
                ? 'border-green-500'
                : query.status === 'In Progress'
                ? 'border-yellow-500'
                : query.status === 'Query Transfer'
                ? 'border-blue-500'
                : 'border-transparent'; // Fallback if no status matches

            return (
              <div
                className={`${
                  openIndex !== index ? 'bg-[#F3F5F6]' : 'bg-[#E9F1FF]'
                }
                ${statusBorderColor} border-l-4 border-r-4 rounded-[20px] py-[12px] px-[16px] shadow-md transition-all duration-300 ease-in-out`}
                key={index}
              >
                <div
                  onClick={() => toggleAccordion(index)}
                  className='flex flex-col gap-[10px] cursor-pointer'
                >
                  <div className='flex justify-between items-center'>
                    <h4 className='font-semibold text-[18px] leading-[18px] md:leading-[26px] md:text-[22px]'>
                      {query?.raisedBy?.name} ({query?.queryId})
                    </h4>
                    {openIndex !== index ? (
                      <div
                        className='cursor-pointer transform transition-transform duration-300 hover:scale-110'
                        onClick={() => toggleAccordion(index)}
                      >
                        <img src={AddBlackSvg} alt='Expand' />
                      </div>
                    ) : (
                      <div
                        className='h-[34px] w-[34px] bg-white rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-110'
                        onClick={() => toggleAccordion(index)}
                      >
                        <img src={CloseSvg} alt='Collapse' />
                      </div>
                    )}
                  </div>
                  <div
                    className={`accordion-collapse ${
                      openIndex === index ? 'show' : ''
                    } transition-max-height duration-500 ease-in-out overflow-hidden`}
                  >
                    <div className='accordion-collapse-body flex flex-col gap-[10px]'>
                      <div className='flex gap-[12px] items-center'>
                        <div className='bg-gradient-to-b from-[#0B4E67] from-12% to-[#61C9EF] to-100% h-[10px] w-[10px] rounded-full'></div>
                        <h5 className='md:text-[20px] font-medium md:leading-[28px]'>
                          Diagnosis:{' '}
                          {query.diagnosis || 'No Diagnosis Provided'}
                        </h5>
                      </div>
                      <div className=''>
                        <OutLineBtn
                          title={
                            getText(
                              metaData?.[userType]?.queryListButtonText
                            ) || 'Respond to Query'
                          }
                          showIcon={true}
                          onClick={() =>
                            navigate('/Query', {
                              state: {
                                query,
                                userType,
                                disableOption: userType === 'DRTB',
                                respondedBy: data?.user_profile?._id,
                                queryRespondedInstitute:
                                  data?.user_profile?.userContext?.queryDetails
                                    ?.instituteId,
                                queryRespondedRole:
                                  data?.user_profile?.userContext?.queryDetails
                                    ?.type?._id,
                              },
                            })
                          }
                          iconSrc={RightArrowBlackSvg}
                          color='black'
                          customClassName='w-full btn'
                        />
                      </div>
                      <div className='text-end'>
                        <span className='text-[#808080] text-[14px]'>
                          {queryDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
