import Link from 'next/link';
import Wrapper from './styles';

interface demo_data {
  url: string;
  content: string;
}

const DEMO_DATA: demo_data[] = [
  { url: '/', content: 'LoGo' },
  { url: '/', content: '성향 테스트' },
  { url: '/admin', content: '성향 테스트 만들기' },
];

const Header = (): JSX.Element => {
  return (
    <Wrapper>
      <nav>
        {DEMO_DATA.map((data, index) => {
          return (
            <div key={'content' + index}>
              <Link href={data.url}>
                <a>{data.content}</a>
              </Link>
            </div>
          );
        })}
      </nav>
    </Wrapper>
  );
};

export default Header;
