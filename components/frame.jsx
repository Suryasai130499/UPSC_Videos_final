import Head from "next/head";
import { useRouter } from "next/router";
import Nav from "./NavBar/navbar";

const Frame = ({ title, image, children }) => {
  const router = useRouter();
  const url = router.asPath;
  const host = `https://upsc-videos-final.vercel.app${url}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={image || 'https://lh3.googleusercontent.com/iHsYuRmemnz8rgCu65gWPPDXL0c0uHrwC2b4sHNyylpeEmuvw6_9nPyhkqdsjv_Rsu36'} />
        <link rel="icon" href={'https://lh3.googleusercontent.com/iHsYuRmemnz8rgCu65gWPPDXL0c0uHrwC2b4sHNyylpeEmuvw6_9nPyhkqdsjv_Rsu36'} type="image/x-icon" />
        <meta property="og:description" content={`${title}, Watch UPSC videos for free.`} />
        <meta property="og:url" content={host || 'https://upsc-videos-final.vercel.app/'} />
      </Head>
      <Nav />
      {children}
    </>
  );
};

export default Frame;