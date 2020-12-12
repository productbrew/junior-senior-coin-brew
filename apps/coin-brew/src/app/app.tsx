import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Layout, Modal, Button } from 'antd';
import Loading from './loading';
import { useMeQuery } from './graphql/client';

const { Header, Content } = Layout;

export function App() {
  const [result] = useMeQuery();

  return (
    <Layout>
      {result.fetching && <Loading fullPage />}

      <Header>
        <Title>Coin brew</Title>
      </Header>
      {<span>{result.error?.message}</span>}
      {<span>{result.data?.me.name}</span>}
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
