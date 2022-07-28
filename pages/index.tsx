import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/Home.module.css';

import Feed from '../components/Feed';
import Trending from '../components/Trending';

import PostForm from '../components/PostForm';
import { NavbarMinimal } from '../components/NavbarMinimal';

const Home: NextPage = () => {
  return (
    <div className='my-4 max-w-6xl mx-auto '>
      <Head>
        <title>ResistFix.com</title>
        <meta name='description' content='Resist something!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex space-x-4 px-3'>
        <div className='hidden md:block'>
          <NavbarMinimal />
        </div>
        <div className='max-w-2xl mx-auto w-full'>
          <PostForm />
          <Feed />
        </div>
        <div className='hidden md:block'>
          {' '}
          <Trending />
        </div>
      </div>
    </div>
  );
};

export default Home;
