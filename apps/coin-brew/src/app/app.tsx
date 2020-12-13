import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AuthenticationModal } from './authenticationModal';
import { useMeQuery } from './graphql/client';
import { useAuthDispatch } from './authContext';
import { useClientReset } from './urqlClient';
import { CoinList } from './coinList';

const { Header, Content } = Layout;

export function App() {
  const [meResult, reExecuteMeResult] = useMeQuery();

  const dispatch = useAuthDispatch();
  const resetClient = useClientReset();

  const userName = meResult.data?.me.name;

  return (
    <Layout>
      <StyledHeader>
        <Title
          onClick={() => {
            reExecuteMeResult({ requestPolicy: 'network-only' });
          }}
        >
          Coin brew
        </Title>

        <Dropdown
          disabled={!userName}
          overlay={
            <Menu>
              <Menu.Item>{meResult.data?.me.email}!</Menu.Item>
              <Menu.Item>
                <div
                  onClick={() => {
                    localStorage.removeItem('access_token');
                    resetClient();

                    dispatch({
                      type: 'AUTH_STATE_CHANGED',
                      payload: 'UNAUTHENTICATED',
                    });
                  }}
                >
                  Logout
                </div>
              </Menu.Item>
            </Menu>
          }
          placement="bottomRight"
          arrow
        >
          <DropDownContainer>
            <Name>{userName ? `Hello ${userName}!` : null}</Name>
            <Avatar size={32} icon={<UserOutlined />} />
          </DropDownContainer>
        </Dropdown>
      </StyledHeader>
      <Container>
        <AuthenticationModal />

        <CoinList />
      </Container>
    </Layout>
  );
}

const Title = styled.div`
  color: green;
`;

const DropDownContainer = styled.div`
  display: flex;
  height: 32px;
  align-items: center;
`;

const Name = styled.h2`
  color: white;
  margin-top: 10px;
  margin-right: 20px;
`;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled(Content)`
  display: flex;
  justify-content: center;
  margin: 16px;
`;

export default App;
