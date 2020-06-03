/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ContentLoader from 'react-content-loader';

const PostLoader = (props) => {
  return (
    <div css={styledPostLoader}>
      <ContentLoader
        speed={2}
        style={{
          width: '100%',
        }}
        height={200}
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
        {...props}
      >
        <rect
          x='0'
          y='0'
          rx='3'
          ry='3'
          style={{
            width: '30%',
          }}
          height='8'
        />
        <rect
          x='0'
          y='20'
          rx='3'
          ry='3'
          style={{
            width: '15%',
          }}
          height='8'
        />
        <rect
          x='0'
          y='60'
          rx='3'
          ry='3'
          style={{
            width: '100%',
          }}
          height='8'
        />
        <rect
          x='0'
          y='80'
          rx='3'
          ry='3'
          style={{
            width: '100%',
          }}
          height='8'
        />
        <rect
          x='0'
          y='100'
          rx='3'
          ry='3'
          style={{
            width: '100%',
          }}
          height='8'
        />
        <rect
          x='0'
          y='120'
          rx='3'
          ry='3'
          style={{
            width: '90%',
          }}
          height='8'
        />
        <rect
          x='0'
          y='140'
          rx='3'
          ry='3'
          style={{
            width: '75%',
          }}
          height='8'
        />
        <rect
          x='0'
          y='180'
          rx='3'
          ry='3'
          style={{
            width: '20%',
          }}
          height='8'
        />
      </ContentLoader>
    </div>
  );
};

const styledPostLoader = css`
  width: 100%;
  background-color: #fff;
  margin: 2rem 0;
  padding: 2rem;

  @media (max-width: 500px) {
    margin: 1rem 0;
    padding: 1rem;
  }
`;

export default PostLoader;
