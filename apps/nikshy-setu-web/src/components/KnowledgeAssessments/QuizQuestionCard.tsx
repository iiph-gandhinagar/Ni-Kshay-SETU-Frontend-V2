export const QuizQuestionCard = ({
  questionsState,
  currentQuestionIndex,
  optionOnchangeHandler,
}: any) => {
  const question = questionsState[currentQuestionIndex];
  const selectedOptionIndex = question.selectedOptionsIndex;

  return (
    <div className='bg-white rounded-[20px] p-[20px]'>
      <div className='mb-[28px] flex flex-col gap-[20px]'>
        <h1 className='text-xl font-semibold text-[#4B5F83]'>
          {currentQuestionIndex + 1}. {question.question}
        </h1>

        <div className='space-y-4'>
          {question.options.map((option, index) => {
            const borderClassValue =
              selectedOptionIndex === index
                ? 'border-[#4B5F83]'
                : 'border-[#D9DBDB]';
            const rightAnswerClass =
              question.correctAnsweredIndex == index
                ? '!border-[#30D03F] !bg-[#30D03F80] !text-[#000000]'
                : '';
            const wrongAnswerClass =
              question.selectedOptionsIndex == index
                ? 'border-[#FF6060] bg-[#FF606033]'
                : '';

            return (
              <div
                key={option + index}
                className={`${
                  question.isSubmitted
                    ? `${rightAnswerClass} ${wrongAnswerClass}`
                    : borderClassValue
                } border px-[8px] py-[12px] flex items-center gap-[10px] rounded-[12px] ${
                  !question.isSubmitted
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed'
                } text-[#797979]`}
                onClick={() => {
                  if (!question.isSubmitted)
                    optionOnchangeHandler(
                      question.selectedOptionsIndex == index ? undefined : index
                    );
                }}
              >
                <div>
                  <span className='bg-[#4B5F831A] h-[32px] w-[30px] text-[#4B5F83] rounded-full flex items-center justify-center text-[18px]'>
                    {index + 1}
                  </span>
                </div>
                {option}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
