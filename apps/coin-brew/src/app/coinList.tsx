import React from 'react';
import styled from '@emotion/styled';
import { List, Card, Image } from 'antd';
import { useCoinsQuery } from './graphql/client';

export function CoinList() {
  const [coinsResult] = useCoinsQuery();

  return (
    <Container>
      <List
        loading={coinsResult.fetching}
        dataSource={coinsResult.data?.coins ?? []}
        grid={{
          gutter: 16,
        }}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <StyledCover>
                  <Image alt="example" src={item.logoUrl} width="150px" />
                </StyledCover>
              }
            >
              <Card.Meta title={`${item.name} (${item.currency})`}></Card.Meta>
            </Card>
          </List.Item>
        )}
      />
    </Container>
  );
}

const StyledCover = styled.div`
  max-width: 200px;
  max-height: 200px;
  display: flex;
  justify-content: center;
  padding: 16px;
`;

const Container = styled.div`
  width: 80%;
`;
