import React, { useState } from 'react';
import styled from '@emotion/styled';
import { List, Card, Image } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { useCoinsQuery } from './graphql/client';
import Error from './error';
import Loading from './loading';

export function CoinList() {
  const [skip, setSkip] = useState(0);

  const [coinsResult] = useCoinsQuery({
    variables: {
      skip,
      limit: 15,
    },
  });

  if (coinsResult.error) {
    return <Error>{coinsResult.error.message}</Error>;
  }

  return (
    <Container>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loader={
          <LoadingContainer key="loader">
            {skip > 0 && <Loading />}
          </LoadingContainer>
        }
        loadMore={(page) => setSkip(page)}
        hasMore={true}
      >
        <List
          dataSource={coinsResult.data?.coins ?? undefined}
          grid={{
            gutter: 16,
            column: 6,
            xs: 1,
            md: 3,
            sm: 2,
            lg: 4,
            xl: 5,
          }}
          loading={coinsResult.fetching}
          renderItem={(item) => (
            <List.Item key={item.id}>
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
      </InfiniteScroll>
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;
