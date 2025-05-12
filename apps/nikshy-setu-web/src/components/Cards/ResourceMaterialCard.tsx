import {
  DocumentsSvg,
  FolderIconSvg,
  PDFSvg,
  VideoCircleSvg,
  VideoFileIconSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { OutLineBtn } from '../Buttons/Btns';
const getIconForFileType = (fileType) => {
  switch (fileType) {
    case 'folder':
      return FolderIconSvg;
    case 'ppt':
      return VideoFileIconSvg;
    case 'pdfs':
      return PDFSvg;
    case 'pdf_office_orders':
      return PDFSvg;
    case 'document':
      return DocumentsSvg;
    case 'videos':
      return VideoCircleSvg;
    default:
      return DocumentsSvg;
  }
};

interface ResourceMaterialCardProps {
  onViewClick?: () => void;
  id?: number;
  isActive?: boolean;
  isNext?: boolean;
  title: string;
  type?: string;
  date: string;
  url?: string;
}
export const ResourceMaterialCard: React.FC<ResourceMaterialCardProps> = ({
  onViewClick = () => null,
  id,
  isActive,
  isNext,
  title = '',
  type,
  date,
  url,
}) => {
  return (
    <div
      className={`bg-white rounded-[24px] flex flex-col p-[16px] md:p-[28px] shadow-xl items-center mx-8 ${
        isActive ? 'h-auto' : 'h-60 overflow-hidden'
      }`}
    >
      {isActive ? (
        <>
          <div className='flex gap-[12px]'>
            <div className='bg-darkBlue w-[48px] h-[48px] flex items-center justify-center ring-[6px] ring-[#F7F8F9] rounded-full'>
              <h6 className='text-white leading-6 font-semibold'>{id}</h6>
            </div>
            <img
              src={getIconForFileType(type)}
              alt='Video'
              className='w-[48px] h-[48px]'
            />
          </div>
          <div className='flex flex-col my-[28px] gap-[4px] items-center text-center'>
            <h6 className='leading-6 font-bold'>{title}</h6>
            <h6 className='text-[16px] font-medium leading-[24px] text-darkSilver'>
              {moment(date)?.format('MMMM DD, YYYY')}
            </h6>
          </div>
          {url && (
            <Link to={url} target='_blank'>
              <OutLineBtn
                title='View'
                customClassName='!text-[14px] font-semibold px-[12px] py-[8px] rounded-full h-9 w-[144px] !border-black !text-black'
              />
            </Link>
          )}
        </>
      ) : null}
    </div>
  );
};
