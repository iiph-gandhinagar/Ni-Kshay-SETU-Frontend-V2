import { FC, useEffect, useRef, useState } from 'react';
import { StackedCarousel } from 'react-card-stack-carousel';
import 'react-card-stack-carousel/styles/styles.css'; // import base styles
import { MaterialListProps } from 'shared/types/src/screens/StaticContact';
import { ResourceMaterialCard } from '../Cards/ResourceMaterialCard';
interface ResourceMaterialCarouselProps {
  data: MaterialListProps[];
}
export const ResourceMaterialCarousel: FC<ResourceMaterialCarouselProps> = ({
  data,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(250);
  const [index, setindex] = useState(0);
  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContentHeight(entry.target.clientHeight);
      }
    });
    observer.observe(element);
    return () => {
      setContentHeight(250);
      observer.disconnect();
    };
  }, [data]);
  return (
    data?.length > 0 && (
      <StackedCarousel
        height={contentHeight + 30}
        styleOverrides={{
          CarouselItem: { width: '100%', height: '100%' },
          Navigation: { zIndex: 1000 },
        }}
        verticalOffset={-10}
        startIndex={index}
        onNext={() => {
          setindex((old) => (old === data?.length - 1 ? 0 : old + 1));
        }}
        onPrevious={() =>
          setindex((old) => (old < 1 ? data?.length - 1 : old - 1))
        }
      >
        {data?.map((card, index2) => {
          return (
            <ResourceMaterialCard
              id={index2 + 1}
              isActive={index2 == index}
              title={card?.title?.en}
              key={card?._id}
              type={card?.typeOfMaterials}
              date={card?.createdAt}
              url={
                card?.material[0]
                  ? process.env.NX_PUBLIC_STORE_URL + card?.material[0]
                  : undefined
              }
            />
          );
        })}
      </StackedCarousel>
    )
  );
};
