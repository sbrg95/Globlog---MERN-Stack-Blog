/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const Alert = ({ errors }) => {
  return (
    <div css={styledAlert}>
      <ul>
        {errors.map((error, index) => (
          <li key={`error-${index}`}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

const styledAlert = css`
  width: 100%;
  border-radius: 5px;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  margin-top: 2rem;
  padding: 0.3rem 0;
`;

export default Alert;
