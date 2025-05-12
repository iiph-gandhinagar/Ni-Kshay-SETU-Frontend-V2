import * as d3 from 'd3';
import React, { useEffect } from 'react';
import { StateWiseCountProps } from 'shared/types/src/screens/StaticContact';
import * as topojson from 'topojson-client';
interface IndiaMapProps {
  title?: string;
  subscribers_presence?: StateWiseCountProps[];
}
export const IndiaMap: React.FC<IndiaMapProps> = ({
  title = '',
  subscribers_presence = [],
}) => {
  useEffect(() => {
    const w = 850;
    const h = 850;
    const proj = d3.geoMercator();
    const path = d3.geoPath().projection(proj);
    function initialize() {
      proj.scale(1300);
      proj.translate([-1410, 960]);
    }
    const colorScale = d3
      .scaleThreshold<number, string>()
      .domain([0, 100, 1000, 2000, 10000, 20000])
      .range([
        '#9ecae1',
        '#76b1d5',
        '#5497c9',
        '#337dbe',
        '#1163b2',
        '#084594',
      ]);

    // Create SVG container
    const map = d3
      .select('#chart')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .attr('viewBox', `0 0 ${w} ${h}`)
      .attr('preserveAspectRatio', 'xMinYMin')
      .call(initialize);

    const india = map.append('g').attr('id', 'india');
    const circles = map.append('g').attr('id', 'circles');

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .attr('id', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #ccc')
      .style('border-radius', '4px')
      .style('padding', '8px')
      .style('pointer-events', 'none')
      .style('font-size', '12px');

    d3.json(process.env.NX_PUBLIC_BASE_URL + 'dashboard/get-india-topo-json')
      .then((e: any) => e?.data)
      .then((json) => {
        const data = topojson.feature(
          json as any,
          (json as any).objects.india
        ).features;

        // Draw map
        india
          .selectAll<SVGPathElement, any>('path')
          .data(data)
          .enter()
          .append('path')
          .attr('d', path as any)
          .style('stroke', '#fff')
          .style('fill', (d: any) => {
            const counts = subscribers_presence.find(
              (e) => e?.state_id === d?.properties?.state_id
            )?.TotalSubscriberCount;
            return counts ? colorScale(counts) : '#E5E5E5'; // Default gray if no data
          })
          .on('mouseover', function (event, d: any) {
            d3.select(this).transition().duration(300).style('opacity', 0.8);
            const counts = subscribers_presence.find(
              (e) => e.state_id === d?.properties?.state_id
            );

            if (counts) {
              tooltip
                .html(
                  `<strong>${counts.StateName}</strong><br/>Subscribers: ${counts.TotalSubscriberCount}`
                )
                .style('opacity', 1)
                .style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY + 10}px`);
            }
          })
          .on('mouseout', function () {
            d3.select(this).transition().duration(300).style('opacity', 1);
            tooltip.style('opacity', 0);
          });

        // Add circles
        circles
          .selectAll<SVGCircleElement, any>('circle')
          .data(data)
          .enter()
          .append('circle')
          .attr('r', (d: any) => {
            const counts = subscribers_presence.find(
              (e) => e.state_id === d?.properties?.state_id
            )?.TotalSubscriberCount;
            return counts ? 3 : 0;
          })
          .attr('cx', (d: any) => path.centroid(d?.geometry)?.[0] || 0)
          .attr('cy', (d: any) => path.centroid(d?.geometry)?.[1] || 0)
          .style('fill', '#00ffff')
          .style('opacity', 0.7)
          .on('mouseover', function (event, d: any) {
            d3.select(this).transition().duration(300).style('opacity', 1);
            const counts = subscribers_presence.find(
              (e) => e.state_id === d?.properties?.state_id
            );

            if (counts) {
              tooltip
                .html(
                  `<strong>${counts.StateName}</strong><br/>Subscribers: ${counts.TotalSubscriberCount}`
                )
                .style('opacity', 1)
                .style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY + 10}px`);
            }
          })
          .on('mouseout', function () {
            d3.select(this).transition().duration(300).style('opacity', 0.7);
            tooltip.style('opacity', 0);
          });

        // Add vertical legend on the right
        const legend = map
          .append('g')
          .attr('id', 'legend')
          .attr('transform', `translate(${w - 120}, 50)`);

        const legendData = [
          { label: '0-100', color: '#9ecae1' },
          { label: '101-1000', color: '#76b1d5' },
          { label: '1001-2000', color: '#5497c9' },
          { label: '2001-10000', color: '#337dbe' },
          { label: `10001-20000`, color: '#1163b2' },
          { label: `20000+`, color: '#084594' },
        ];

        legend
          .selectAll('rect')
          .data(legendData)
          .enter()
          .append('rect')
          .attr('x', 0)
          .attr('y', (_, i) => i * 25)
          .attr('width', 20)
          .attr('height', 20)
          .style('fill', (d) => d.color);

        legend
          .selectAll('text')
          .data(legendData)
          .enter()
          .append('text')
          .attr('x', 30)
          .attr('y', (_, i) => i * 25 + 15)
          .text((d) => d.label)
          .style('font-size', '12px');
      });

    return () => {
      d3.selectAll('#chart svg').remove();
      d3.selectAll('#tooltip').remove();
    };
  }, [subscribers_presence]);

  return (
    <section className='pt-[64px]'>
      <div className='container mx-auto'>
        <div className='max-w-[1140px] mx-auto'>
          <div>
            <span className='bg-darkBlue/10 text-darkBlue text-[12px] font-medium px-[8px] py-[2px] rounded-[36px] leading-[18px]'>
              Subscribers
            </span>
            <h2 className='mt-[16px] text-xl md:text-[28px] font-bold -tracking-[0.32px] md:leading-[33.6px]'>
              {title}
            </h2>
          </div>
          <div
            id='chart'
            className='flex mt-[28px] justify-center bg-[#F9F9F9] items-center'
          ></div>
        </div>
      </div>
    </section>
  );
};
