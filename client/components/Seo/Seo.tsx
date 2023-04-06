import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

interface HeadMetaProps {
  title: string;
  description: string;
  ogImageUrl: string;
  ogTitle: string;
  ogDescription: string;
  altImage: string;
}

const Seo = ({
  title,
  description,
  ogImageUrl,
  ogTitle,
  ogDescription,
  altImage,
}: HeadMetaProps): JSX.Element => {
  const { pathname } = useRouter();

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={`https://rororo-marshmallow.store${pathname}`}
      openGraph={{
        url: `https://rororo-marshmallow.store${pathname}`,
        title: ogTitle,
        description: ogDescription,
        images: [
          {
            url: ogImageUrl,
            width: 800,
            height: 600,
            alt: altImage,
          },
        ],
      }}
    />
  );
};

export default Seo;
