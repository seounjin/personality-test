import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="http://rororo-marshmallow.store/images/favicon.svg"
          width="140px"
          height="140px"
          style={{ marginTop: '20px' }}
        />
        <p>누구나 쉽게 만들고 공유해 보아요</p>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}
