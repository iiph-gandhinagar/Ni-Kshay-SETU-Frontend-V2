import { topModulesWeb } from '@nikshay-setu-v3-monorepo/constants';
import { useMemo } from 'react';
import { TopModulesCard } from '../Cards/TopModulesCard';

type TopModulesProps = {
  _id: string;
  title: string;
}[];

const CardColors = [
  {
    fromBgColor: '#383A68',
    toBgColor: '#6F73CE',
  },
  {
    fromBgColor: '#0C3896',
    toBgColor: '#5D88E4',
  },
  {
    fromBgColor: '#0B4E67',
    toBgColor: '#61C9EF',
  },
  {
    fromBgColor: '#4B5F83',
    toBgColor: '#B1BED4',
  },
];

export const TopModules = ({
  topModulesData,
}: {
  topModulesData: TopModulesProps;
}) => {
  const fixedPotions = [
    'Knowledge Connect',
    'ManageTB India',
    'Query2COE',
    'Knowledge Quiz',
  ];
  const alterNativeOptions = {
    'ManageTB India': ['Screening Tool'],
    Query2COE: ['Knowledge Quiz'],
    'Knowledge Quiz': ['Diagnostic Cascade'],
  };

  const nav = useMemo(() => {
    if (!topModulesData.length) return [];

    // modules array to object
    const modulesData = {};
    Object.entries(topModulesWeb).forEach(
      ([key, value]) => (modulesData[value.name] = value)
    );

    // clone array
    let cardArray = structuredClone(topModulesData);

    const store = fixedPotions.map((title) => {
      const isVisibleCard = topModulesData.find((obj) => obj.title == title);
      let cardData;
      if (isVisibleCard && cardArray.find((obj) => obj.title == title)) {
        cardData = modulesData[title];
      } else {
        // check in alterNativeOptions
        let alterNativeCardTitle = undefined;
        if (
          alterNativeOptions[title] &&
          Array.isArray(alterNativeOptions[title])
        ) {
          alterNativeCardTitle = alterNativeOptions[title].find((title) =>
            cardArray.find((obj) => obj.title == title)
          );
        }

        if (alterNativeCardTitle) {
          cardData = modulesData[alterNativeCardTitle];
        } else {
          const random = cardArray.find(
            (obj) => !fixedPotions.includes(obj.title)
          );
          cardData = modulesData[random?.title];
        }
      }

      // remove card main object
      cardArray = cardArray.filter((obj) => obj.title !== cardData?.name);

      // send card data
      return cardData;
    });
    return store;
  }, [topModulesData]);

  return (
    <section>
      <div className='lg:max-w-[1012px] mx-auto'>
        <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-[12px]'>
          {nav?.slice(0, 4).map((item, i) => {
            return (
              <TopModulesCard
                key={i}
                name={item?.name}
                fromBgColor={CardColors[i].fromBgColor}
                toBgColor={CardColors[i].toBgColor}
                image={item?.image}
                path={item?.path}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
