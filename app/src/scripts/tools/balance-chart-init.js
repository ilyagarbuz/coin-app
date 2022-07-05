import Chart from 'chart.js/auto';
import transactionsDateFilter from './transactions-filter';

export default function balaceChartInit(account, transactions, range) {
  const monthlyRceipts = transactionsDateFilter(account, transactions);

  const months = [];
  const profit = [];

  for (const key in monthlyRceipts) {
    months.push(key);
    profit.push(Math.floor(monthlyRceipts[key]));
  }

  let displayMonth;
  let displayProfit;
  if (months.length < range) {
    displayMonth = months;
    displayProfit = profit;
  } else {
    displayMonth = months.slice(-range);
    displayProfit = profit.slice(-range);
  }
  const max = Math.max.apply(null, displayProfit);
  let min = Math.min.apply(null, displayProfit);
  if (max === min) min = 0;

  const chartBlock = document.getElementById('balance-chart');
  const chartAreaBorder = {
    id: 'chartAreaBorder',
    beforeDraw(chart, args, options) {
      const {
        ctx, chartArea: {
          left, top, width, height,
        },
      } = chart;
      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.setLineDash(options.borderDash || []);
      ctx.lineDashOffset = options.borderDashOffset;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    },
  };
  const balanceChart = new Chart(chartBlock, {
    type: 'bar',
    data: {
      labels: displayMonth,
      datasets: [{
        data: displayProfit,
        backgroundColor: 'rgba(17, 106, 204, 1)',
        barThickness: 50,
      }],
    },
    options: {
      layout: {
        padding: {
          left: 2,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        chartAreaBorder: {
          borderColor: 'black',
          borderWidth: 2,
          borderDashOffset: 2,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: 'black',
            font: {
              weight: 600,
              family: 'Arial',
            },
          },
        },
        y: {
          display: false,
          grid: {
            display: false,
          },
        },
        myScale: {
          min: max,
          max: min,
          position: 'right', // `axis` is determined by the position as `'y'`
          stepSize: max * 2,
          grid: {
            display: false,
          },
          ticks: {
            stepSize: displayProfit[displayProfit.length - 1],
            color: 'black',
            padding: 0,
            font: {
              size: 18,
              weight: 600,
              family: 'Arial',
            },
          },
        },
      },
    },
    plugins: [chartAreaBorder],
  });

  const chartBlockAdvan = document.getElementById('balance-chart-advanced');

  if (chartBlockAdvan) {
    const positiveTransactions = transactionsDateFilter(account, transactions, 'positive');
    const negativeTransactions = transactionsDateFilter(account, transactions, 'negative');

    const advancedMonths = [];
    const positiveData = [];
    const negativeData = [];

    for (const key in positiveTransactions) {
      advancedMonths.push(key);
      positiveData.push(Math.floor(positiveTransactions[key]));
    }

    for (const key in negativeTransactions) {
      negativeData.push(Math.floor(positiveTransactions[key]));
    }

    let displayAdvancedMonth;
    let displayAdvancedProfit;
    let displayNegativeData;
    if (advancedMonths.length < range) {
      displayAdvancedMonth = advancedMonths;
      displayAdvancedProfit = positiveData;
      displayNegativeData = negativeData;
    } else {
      displayAdvancedMonth = advancedMonths.slice(-range);
      displayAdvancedProfit = positiveData.slice(-range);
      displayNegativeData = negativeData.slice(-range);
    }
    const maxAdvan = Math.max.apply(null, displayAdvancedProfit);
    let minAdvan = Math.max.apply(null, displayNegativeData);
    if (maxAdvan === minAdvan) minAdvan = 0;

    const balanceChartAdvan = new Chart(chartBlockAdvan, {
      type: 'bar',
      data: {
        labels: displayAdvancedMonth,
        datasets: [{
          data: displayAdvancedProfit,
          backgroundColor: 'rgba(118,202,102,0.7)',
          barThickness: 50,
        },
        {
          data: displayNegativeData,
          backgroundColor: 'rgba(253,78,93,0.7)',
          barThickness: 50,
        },
        ],
      },
      options: {
        layout: {
          padding: {
            left: 2,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          chartAreaBorder: {
            borderColor: 'black',
            borderWidth: 2,
            borderDashOffset: 2,
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              color: 'black',
              font: {
                weight: 600,
                family: 'Arial',
              },
            },
          },
          y: {
            display: false,
            grid: {
              display: false,
            },
          },
          myScale: {
            min: maxAdvan,
            max: minAdvan,
            position: 'right', // `axis` is determined by the position as `'y'`
            stepSize: maxAdvan * 2,
            grid: {
              display: false,
            },
            ticks: {
              stepSize: displayAdvancedProfit[displayAdvancedProfit.length - 1],
              color: 'black',
              padding: 0,
              font: {
                size: 18,
                weight: 600,
                family: 'Arial',
              },
            },
          },
        },
      },
      plugins: [chartAreaBorder],
    });
  }

  Chart.defaults.elements.bar.borderSkipped = 'bottom';
}
