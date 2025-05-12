import { LevelWiseSubscribersProps } from 'shared/types/src/screens/StaticContact';
import { DoughnutChart } from '../Charts/pie-chart';
interface LevelwiseSubscribersCardProps {
  title: string;
  data?: LevelWiseSubscribersProps[];
}
export const LevelwiseSubscribersCard: React.FC<
  LevelwiseSubscribersCardProps
> = ({ title = '', data }) => {
  return (
    <div className='bg-white p-4 xl:px-[24px] xl:py-20 rounded-2xl drop-shadow-[0_0_8px_rgba(0,0,0,0.08)]'>
      <h6 className='text-[18px] font-bold leading-4 tracking-[0.01px] text-[#414D55]'>
        {title}
      </h6>
      <div className='my-[24px]'>
        <DoughnutChart
          labels={
            data?.map(
              (e) => e._id?.replace('_', ' ') + ' (' + e.Percentage + '%)'
            ) || []
          }
          Data={data?.map((e) => e.TotalCadreCount) || []}
          id='Levelwise Subscribers'
        />
      </div>
    </div>
  );
};
