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
          column: 6,
          xs: 1,
          md: 3,
          sm: 2,
          lg: 4,
          xl: 5,
        }}
        renderItem={(item) => (
          <List.Item>
            <StyledCard
              hoverable
              cover={
                <StyledCover>
                  <Image
                    preview={false}
                    alt="example"
                    src={item.logoUrl}
                    width="80px"
                  />
                </StyledCover>
              }
            >
              <Card.Meta
                title={`${item.name} (${item.currency})`}
                description={`Price: $${Number(item.price).toFixed(2)}`}
              />
            </StyledCard>
          </List.Item>
        )}
      />
    </Container>
  );
}

const StyledCover = styled.div`
  display: flex;
  height: 180px;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const StyledCard = styled(Card)`
  height: 270px;
`;

const Container = styled.div`
  width: 80%;
`;
