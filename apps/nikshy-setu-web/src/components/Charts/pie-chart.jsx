import { Chart as ChartJS, registerables } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
export const colorPalettes = [
  '#3070F5',
  '#57BEB5',
  '#AE59DC',
  '#EA334B',
  '#F2A73B',
  '#f3ca3b',
];

ChartJS.register(...registerables);

export const DoughnutChart = ({ labels = [], Data = [], id = '' }) => {
  const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');

    if (!listContainer) {
      listContainer = document.createElement('ul');
      listContainer.style.display = 'flex';
      listContainer.style.flexDirection = 'row';
      listContainer.style.flexWrap = 'wrap';
      listContainer.style.gap = '12px';
      listContainer.style.justifyContent = 'center';
      listContainer.style.marginBottom = 0;
      listContainer.style.marginTop = '24px';
      listContainer.style.padding = 0;
      listContainer.style.flexWrap = 'wrap';
      legendContainer.appendChild(listContainer);
    }

    return listContainer;
  };

  const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
      const ul = getOrCreateLegendList(chart, options.containerID);

      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }

      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);
      items.forEach((item) => {
        const li = document.createElement('li');
        li.style.borderRadius = '4px';
        li.style.paddingLeft = '8px';
        li.style.paddingRight = '8px';
        li.style.paddingBottom = '4px';
        li.style.paddingTop = '4px';
        li.style.backgroundColor = '#F2F2F7';
        li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        // li.style.marginTop = "30px";

        li.onclick = () => {
          const { type } = chart.config;
          if (type === 'pie' || type === 'doughnut') {
            // Pie and doughnut charts only have a single dataset and visibility is per item
            chart.toggleDataVisibility(item.index);
          } else {
            chart.setDatasetVisibility(
              item.datasetIndex,
              !chart.isDatasetVisible(item.datasetIndex)
            );
          }
          chart.update();
        };

        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderRadius = '2px';
        // boxSpan.style.borderWidth = item.lineWidth + 'px';
        boxSpan.style.display = 'inline-block';
        boxSpan.style.flexShrink = 0;
        boxSpan.style.height = '12px';
        boxSpan.style.marginRight = '8px';
        boxSpan.style.width = '12px';

        // Text
        const textContainer = document.createElement('p');
        textContainer.style.fontFamily = 'Maison';
        textContainer.style.fontSize = '12px';
        textContainer.style.lineHeight = '16px';
        textContainer.style.fontWeight = 400;
        textContainer.style.color = '#000000';
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);

        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      });
    },
  };
  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(240, 240, 240,1)';
      tooltipEl.style.borderRadius = '6px';
      tooltipEl.style.fontFamily = 'Maison';
      tooltipEl.style.fontSize = '12px';
      tooltipEl.style.color = 'black';
      tooltipEl.style.fontWeight = 500;
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      //   tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all 0.25s ease-in-out';

      const table = document.createElement('table');
      table.style.margin = '0px';

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };
  return (
    <React.Fragment>
      <div style={{ maxWidth: 280, marginTop: 12, margin: '0 auto' }}>
        <Doughnut
          style={{
            minHeight: 200,
          }}
          data={{
            labels: labels,
            datasets: [
              {
                data: Data,
                backgroundColor: colorPalettes,
              },
            ],
          }}
          options={{
            interaction: {
              mode: 'index',
              intersect: false,
            },
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
              htmlLegend: {
                // ID of the container to put the legend in
                containerID: id,
              },
              legend: {
                display: false,
              },
              tooltip: {
                // enabled: false,
                // position: 'nearest',
                // external: externalTooltipHandler,
                callbacks: {
                  title: () => null,
                  label: function (context) {
                    return [
                      context?.label?.split('(')[0],
                      '(' + context?.label?.split('(')[1],
                    ];
                  },
                  // afterLabel: function (context) {
                  //     // console.log(context);
                  //     return "( " + context?.formattedValue + "% )"
                  // },
                },
                titleColor(ctx, options) {
                  return 'black';
                },
                bodyColor(ctx, options) {
                  return 'black';
                },
                backgroundColor(ctx, options) {
                  return 'rgba(240, 240, 240,1)';
                },
                borderColor(ctx, options) {
                  return 'black';
                },
                bodyFont: {
                  size: 12,
                  weight: 500,
                  family: 'Maison',
                },
                padding: 7,
              },
            },
            elements: {
              arc: {
                borderWidth: 2,
              },
            },
            cutout: '65%',
          }}
          plugins={[htmlLegendPlugin]}
        />
      </div>
      <div id={id} />
    </React.Fragment>
  );
};
