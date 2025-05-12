import { CertificatesSvg } from '@nikshay-setu-v3-monorepo/assets';
import { useNavigate } from 'react-router-dom';
import { useLanguageObject } from '../../utils/HelperHooks';
import { KnowledgeQuizButton } from '../Buttons/Btns';

export const CompletionCertificateCard = ({
  title,
  id,
}: {
  title?: string;
  id?: string;
}) => {
  const navigate = useNavigate();
  const [langKey, getText] = useLanguageObject();

  return (
    <div className='bg-white rounded-[20px] p-[20px]'>
      <KnowledgeQuizButton
        onClick={() => {
          navigate(`/quiz-certificate?id=${id}&title=${title}`);
        }}
        className=''
      >
        <img src={CertificatesSvg} className='w-[24px] h-[24px]' />{' '}
        {getText('K_QUIZ_VIEW_CERTIFICATE')}
      </KnowledgeQuizButton>
    </div>
  );
};
