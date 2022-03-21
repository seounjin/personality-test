import Button from './styles';

interface MoreOutLineProps {
  onClick: (event) => void;
}

const MoreOutlined = ({ onClick }: MoreOutLineProps): JSX.Element => {
  return (
    <Button aria-label="img-btn" onClick={onClick}>
      <img alt="moreOutlined" src={'/vertical_icon.png'}></img>
    </Button>
  );
};
export default MoreOutlined;
