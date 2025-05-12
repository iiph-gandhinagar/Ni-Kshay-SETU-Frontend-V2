import { CadreWiseSubscribersProps } from 'shared/types/src/screens/StaticContact';
import { ProgressBar2 } from '../progress/ProgressBar';
const color = ['#FF715B', '#34D1BF', '#0496FF', '#6665DD', '#04E762'];
interface CadrewiseSubscribersCardProps {
  title: string;
  data?: CadreWiseSubscribersProps[];
}
export const CadrewiseSubscribersCard: React.FC<
  CadrewiseSubscribersCardProps
> = ({ title = '', data }) => {
  return (
    <div className='bg-white p-4 xl:px-[24px] xl:py-20 rounded-2xl drop-shadow-[0_0_8px_rgba(0,0,0,0.08)]'>
      <h6 className='text-[18px] font-bold leading-4 tracking-[0.01px] text-[#414D55]'>
        {title}
      </h6>
      <div className='space-y-[24px] mt-[24px] flex flex-col'>
        {data?.map((e, i) => {
          return (
            <ProgressBar2
              key={e.cadreId}
              title={e.CadreName}
              label={e.Percentage + '%'}
              color={color[i]}
            />
          );
        })}
      </div>
    </div>
  );
};
