import {
  AdvancedBronzeSvg,
  AdvancedGoldSvg,
  AdvancedSilverSvg,
  BeginnerBronzeSvg,
  BeginnerGoldSvg,
  BeginnerSilverSvg,
  CompetentBronzeSvg,
  CompetentGoldSvg,
  CompetentSilverSvg,
  ExpertBronzeSvg,
  ExpertGoldSvg,
  ExpertSilverSvg,
  ProficientBronzeSvg,
  ProficientGoldSvg,
  ProficientSilverSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { useLanguageObject } from '../../utils/HelperHooks';
import { InformationCard } from '../Cards/InformationCard';

type Task = {
  levelName: string;
  level: string;
  icon1: string;
  icon2: string;
  icon3: string;
  fromBgColor?: string;
  toBgColor?: string;
};

interface InformationTabProps {}
export const InformationTab: React.FC<InformationTabProps> = ({}) => {
  const [langKey, getText, objectToValue] = useLanguageObject();
  const taskData: Task[] = [
    {
      levelName: getText('LEVEL_BEGINNER'),
      level: `${getText('LEADERBOARD_LEVEL')} 1`,
      icon1: BeginnerBronzeSvg,
      icon2: BeginnerSilverSvg,
      icon3: BeginnerGoldSvg,
      fromBgColor: '#D9E242',
      toBgColor: '#84C400',
    },
    {
      levelName: getText('LEVEL_ADVANCED'),
      level: `${getText('LEADERBOARD_LEVEL')} 2`,
      icon1: AdvancedBronzeSvg,
      icon2: AdvancedSilverSvg,
      icon3: AdvancedGoldSvg,
      fromBgColor: '#59CBF2',
      toBgColor: '#40A7E8',
    },
    {
      levelName: getText('LEVEL_COMPETENT'),
      level: `${getText('LEADERBOARD_LEVEL')} 3`,
      icon1: CompetentBronzeSvg,
      icon2: CompetentSilverSvg,
      icon3: CompetentGoldSvg,
      fromBgColor: '#6F61EC',
      toBgColor: '#3D2CD4',
    },
    {
      levelName: getText('LEVEL_PROFICIENT'),
      level: `${getText('LEADERBOARD_LEVEL')} 4`,
      icon1: ProficientBronzeSvg,
      icon2: ProficientSilverSvg,
      icon3: ProficientGoldSvg,
      fromBgColor: '#AE66FF',
      toBgColor: '#7E07E0',
    },
    {
      levelName: getText('LEVEL_EXPERT'),
      level: `${getText('LEADERBOARD_LEVEL')} 5`,
      icon1: ExpertBronzeSvg,
      icon2: ExpertSilverSvg,
      icon3: ExpertGoldSvg,
      fromBgColor: '#FF7F7D',
      toBgColor: '#EC2E4A',
    },
  ];

  return (
    <div className='mb-12 mt-[58px]'>
      <div className='drop-shadow-[0_2px_37.4px_rgba(0,0,0,0.12)] rounded-2xl p-[12px] bg-white'>
        <p className='text-[16px] font-medium text-[#253454] leading-[21.25px]'>
          {getText('LEADERBOARD_DESCRIPTION')}
        </p>
      </div>
      <div className='grid md:grid-cols-2 gap-x-[24px] gap-y-[24px] md:gap-y-[58px] mt-[58px]'>
        {taskData.map((task, key) => (
          <InformationCard task={task} key={key} />
        ))}
      </div>
    </div>
  );
};
