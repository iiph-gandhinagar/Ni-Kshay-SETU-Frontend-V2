import { ArrowRightSvg } from '@nikshay-setu-v3-monorepo/assets';
import { PrimaryBtn } from '../Buttons/Btns';
interface ManageTBNotesProps {
  onClick?: () => void;
  notes: string[];
}
export const ManageTBNotes: React.FC<ManageTBNotesProps> = ({
  notes,
  onClick = () => null,
}) => {
  return (
    <section className='pb-12'>
      <div className='lg:max-w-[1012px] mx-auto'>
        <h5 className='text-[20px] font-semibold text-DARK_BLUE_0C3896'>
          Notes
        </h5>
        <div className='space-y-6 p-[7px]'>
          {notes.map((note, index) => (
            <p key={index} className='text-darkGray4D4D4D -tracking-[0.16px]'>
              {note}
            </p>
          ))}
        </div>
        <PrimaryBtn
          onClick={onClick}
          title='Generate New Prescription'
          customClassName='mt-[58px] w-full btn-outline'
          bgColor='bg-white'
          rightImg={
            <img
              src={ArrowRightSvg}
              alt='Arrow Right'
              className='ml-[12px] w-[23px] h-[23px]'
            />
          }
        />
      </div>
    </section>
  );
};
