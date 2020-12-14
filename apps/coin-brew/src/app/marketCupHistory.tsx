import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
} from 'recharts';
import { useMarketCupHistoryQuery } from './graphql/client';
import styled from '@emotion/styled';
import Loading from './loading';

function nFormatter(num: number, digits: number) {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
}

export function MarketCupHistory() {
  const [marketCupHistoryData] = useMarketCupHistoryQuery();

  if (marketCupHistoryData.fetching) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <AreaChart
        width={800}
        height={200}
        margin={{
          left: 100,
          right: 100,
        }}
        data={marketCupHistoryData.data?.marketCupHistory ?? []}
      >
        <CartesianGrid />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(v) => new Date(v).toLocaleDateString()}
        />
        <YAxis
          tickFormatter={(v) =>
            Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(v)
          }
        />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#00c24a" fill="#1cda64" />
        <Brush
          dataKey="value"
          tickFormatter={(v) => new Date(v).toLocaleDateString()}
        />
      </AreaChart>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
`;
