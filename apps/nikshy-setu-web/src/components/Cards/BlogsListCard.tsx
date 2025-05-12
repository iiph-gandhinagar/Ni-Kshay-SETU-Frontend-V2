import { PrimaryBtn } from '../Buttons/Btns';
import { ArrowRight2 } from '../Icon/ArrowRight';

interface BlogsListCardProps {
  imgSrc?: string;
  date?: string;
  title?: string;
  onClick?: () => void;
}
export const BlogsListCard: React.FC<BlogsListCardProps> = ({
  imgSrc = '',
  date = '',
  title = '',
  onClick = () => null,
}) => {
  return (
    <div className='flex flex-col h-full'>
      <div className='h-full flex justify-center items-center '>
        <img
          className='rounded-[24px] w-full h-72 object-cover'
          src={imgSrc}
          alt={title}
        />
      </div>
      <div className='pt-[24px] flex flex-col h-full'>
        <h6 className='text-[16px] font-bold leading-[24px] text-[#4D4D4D]'>
          {date}
        </h6>
        <h5 className='text-[24px] font-bold leading-[32px] my-[8px]'>
          {title}
        </h5>
        {/* <p className='my-[16px] text-[18px] font-bold text-darkSilver leading-[28px]'>
          {desc}
        </p> */}
      </div>
      <div className='flex justify-start items-end'>
        <PrimaryBtn
          title='Read more'
          onClick={onClick}
          customClassName='px-[12px] py-[8px] rounded-full bg-darkBlue/10 !text-darkBlue !text-[12px] !font-bold leading-[18px] gap-[4px]'
          rightImg={<ArrowRight2 />}
        />
      </div>
    </div>
  );
};
