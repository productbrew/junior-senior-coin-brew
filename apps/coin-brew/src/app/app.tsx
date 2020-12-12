import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Layout, Modal, Button } from 'antd';
import Loading from './loading';
import { useQuery } from 'urql';
const { Header, Content } = Layout;

const MeQuery = `
  query me{
    me {
      id
      name
      email
    }
  }
`;

const HelloQuery = `
  query hello($name: String){
    hello(name: $name)
  }
`;

export function App() {
  const [name, setName] = useState('');

  const [meResult] = useQuery({
    query: MeQuery,
  });

  const [helloResult] = useQuery({
    query: HelloQuery,
    variables: {
      name,
    },
  });

  return (
    <Layout>
      <Header>
        <Title>Coin brew</Title>
      </Header>
      {meResult.error && <span>{meResult.error?.message}</span>}

      <input value={name} onChange={(e) => setName(e.target.value)} />

      <p>Welcome: {helloResult.data?.hello}</p>

      {/* <Loading /> */}
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
