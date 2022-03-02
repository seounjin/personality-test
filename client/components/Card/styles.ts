import styled from 'styled-components';

interface wrapper {
  imgUrl: string;
}

const Wrapper = styled.li<wrapper>`
  width: 25%;
  list-style: none;
  padding: 10px;
  display: inline-block;

  a {
    text-decoration: none;
  }

  .card_header {
    padding-bottom: 75%;
    position: relative;
    background-image: url(${(props) => props.imgUrl});
    border-radius: 4px;
    background-size: cover;
    background-position: 50%;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 10%);
  }
  .card_body {
  }
`;

export default Wrapper;
