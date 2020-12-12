import React from 'react';
import styled from '@emotion/styled';
import { List, Card, Layout } from 'antd';
const { Header, Content } = Layout;

const data = [
  {
    title: 'BTC',
  },
  {
    title: 'ETH',
  },
  {
    title: 'XRP',
  },
  {
    title: 'HOLLY',
  },
  {
    title: 'USDT',
  },
  {
    title: 'XDAI',
  },
];

export function App() {
  return (
    <Layout>
      <Header>
        <Title>Coin brew</Title>
      </Header>
      <Container>
        <List
          grid={{
            gutter: 16,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>???</Card>
            </List.Item>
          )}
        />
      </Container>
    </Layout>
  );
}

const Title = styled.h1`
  color: green;
`;

const Container = styled(Content)`
  display: flex;
  justify-content: center;
  margin: 16px;
`;

export default App;
