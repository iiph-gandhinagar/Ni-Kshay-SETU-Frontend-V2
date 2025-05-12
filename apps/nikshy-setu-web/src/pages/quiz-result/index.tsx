import { Certificate, RightArrowSvg } from '@nikshay-setu-v3-monorepo/assets';
import { KnowledgeQuizButton } from '../../components/Buttons/Btns';
import { CompletionCertificateCard } from '../../components/KnowledgeAssessments/CompletionCertificateCard';
import { QuizViewResult } from '../../components/KnowledgeAssessments/QuizViewResult';

const QuizResult = () => {
  return (
    <section className='pt-[48px] pb-[58px]'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='mb-[58px] bg-[#F3F5F6] rounded-[20px] p-[20px]'>
          <QuizViewResult></QuizViewResult>
          <CompletionCertificateCard></CompletionCertificateCard>
        </div>

        <KnowledgeQuizButton className='gap-[8px] items-center'>
          <img src={Certificate} />
          View Certificate
          <img src={RightArrowSvg} className='w-[24px] h-[24px]' />
        </KnowledgeQuizButton>
      </div>
    </section>
  );
};

export default QuizResult;
