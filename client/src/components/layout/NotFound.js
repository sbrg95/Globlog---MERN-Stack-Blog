/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const NotFound = () => {
  return (
    <div css={styledNotFound}>
      <h1>404 Page Not Found !</h1>
    </div>
  );
};

const styledNotFound = css`
  background-color: #fff;
  margin: 2rem 0;
  padding: 2rem;

  h1 {
    font-size: 2rem;
    text-align: center;
  }
`;

export default NotFound;
