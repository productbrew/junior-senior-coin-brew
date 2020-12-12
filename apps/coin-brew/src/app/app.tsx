import React from 'react';
import styled from '@emotion/styled';
import { List, Card, Layout } from 'antd';
import Jelly from './jelly';
const { Header, Content } = Layout;

const Title = styled.h1`
  color: green;
`;

const Container = styled(Content)`
  display: flex;
  justify-content: center;
  margin: 16px;
`;

const data = [
  {
    title: 'Bitcoin',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

export function App() {
  return <Jelly />;

  // return (
  //   <Layout>
  //     <Header>
  //       <Title>Coin brew</Title>
  //     </Header>
  //     <Container>
  //       <List
  //         grid={{
  //           gutter: 16,
  //         }}
  //         dataSource={data}
  //         renderItem={(item) => (
  //           <List.Item>
  //             <Card title={item.title}>Card content</Card>
  //           </List.Item>
  //         )}
  //       />
  //     </Container>
  //   </Layout>
  // );
}

export default App;
