import { strings } from '@nikshay-setu-v3-monorepo/constants';
import { PrimaryBtn } from '../Buttons/Btns';
interface CreateAccountProps {
  onCreateAccountClick?: (v: string) => void;
}
export const CreateAccount: React.FC<CreateAccountProps> = ({
  onCreateAccountClick = () => null,
}) => {
  return (
    <div>
      <h5 className='text-base sm:text-[24px] font-medium leading-[24px]'>
        {strings.PROMPT}
      </h5>
      <div className='mt-[50px] flex flex-col gap-[12px]'>
        <PrimaryBtn
          title='log-in'
          customClassName='w-full btn-outline'
          bgColor='bg-white'
          onClick={() => onCreateAccountClick('login')}
        />
        <PrimaryBtn
          title='Create a account'
          onClick={() => onCreateAccountClick('sign-up')}
          customClassName='w-full'
        />
      </div>
    </div>
  );
};
