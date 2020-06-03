/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const SearchPost = ({ value, onChange }) => {
  // const [text, setText] = useState('');
  return (
    <div css={styledSearchPost}>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Search Post ...'
      />
    </div>
  );
};

const styledSearchPost = css`
  background-color: #fff;
  color: #333;
  width: 100%;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 1px 3px 20px rgba(0, 0, 0, 0.1);
  input {
    width: 100%;
    margin: 0;
  }
  @media (max-width: 500px) {
    margin: 1rem 0;
    padding: 1rem;
  }
`;

export default SearchPost;
