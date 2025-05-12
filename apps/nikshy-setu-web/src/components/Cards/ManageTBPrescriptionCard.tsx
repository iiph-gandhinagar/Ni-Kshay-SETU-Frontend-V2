import {
  DownloadSvg,
  SendSVGSvg,
  SendWhatsupSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { PatientResponse } from '@nikshay-setu-v3-monorepo/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
type clickEventsType = {
  downloadPdf: () => void;
  sendEmail: () => void;
  sendWhatApp: () => void;
};
export const ManageTBPrescriptionCard = ({
  patientData,
  clickEvents,
}: {
  patientData: PatientResponse;
  clickEvents: clickEventsType;
}) => {
  const Today = new Date();
  const dateInString = `${Today.getDate()}-${
    Today.getMonth() + 1
  }-${Today.getFullYear()}`;

  const [langKey, getText, objectToValue] = useLanguageObject();

  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state ?? {};

  const onHandleBack = () => {
    navigate('/manage-tb-form', { replace: true, state: { formData } });
  };

  return (
    <section className='pb-[20px] pt-[48px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='mb-3'>
          <button
            onClick={onHandleBack}
            className='btn btn-outline  !border-[#B0B0B0] mb-2 text-[20px] font-medium !text-[#4D4D4D]'
          >
            Back
          </button>
        </div>
        <div className='bg-ALICE_BLUE p-5 rounded-2xl space-y-6'>
          <div className='flex justify-between flex-wrap gap-4'>
            <div className='flex flex-col'>
              <h6 className='leading-[22px]'>
                Patient Name: {patientData.name}{' '}
              </h6>
              {patientData.nikshayId && (
                <span className='leading-[22px] text-[16px]'>
                  Id: {patientData.nikshayId}
                </span>
              )}
              <span className='leading-[22px] text-[16px]'>
                Date: {dateInString}
              </span>
            </div>
            <div className='flex gap-[11px]'>
              <img
                onClick={clickEvents.sendWhatApp}
                src={SendWhatsupSvg}
                alt='WhatsApp'
                className='w-[44px] h-[44px] cursor-pointer'
              />
              <img
                onClick={clickEvents.sendEmail}
                src={SendSVGSvg}
                alt='Email'
                className='w-[44px] h-[44px] cursor-pointer'
              />
              <img
                onClick={clickEvents.downloadPdf}
                src={DownloadSvg}
                alt='WhatsApp'
                className='w-[44px] h-[44px] cursor-pointer'
              />
            </div>
          </div>
          <div className=''>
            <h5 className='text-[20px] font-semibold text-DARK_BLUE_0C3896'>
              Diagnosis
            </h5>
            <h6 className='text-darkGray666666 leading-[22px] text-[18px]'>
              {patientData.data.diagnosis}
            </h6>
          </div>
          <div className=''>
            <h5 className='text-[20px] font-semibold text-DARK_BLUE_0C3896'>
              The recommended treatment regimen for the patient is:
            </h5>
            <h6 className='text-darkGray666666 leading-[22px] text-[18px]'>
              {patientData.data.regimen}
            </h6>
          </div>
          <div className=''>
            <h5 className='text-[20px] font-semibold text-DARK_BLUE_0C3896'>
              Prescription
            </h5>
            <pre className='text-darkGray666666 leading-[22px] text-[18px] font-family-maison text-wrap'>
              {patientData.data.prescription}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
