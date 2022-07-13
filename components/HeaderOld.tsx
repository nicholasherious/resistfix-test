import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import {
  BeakerIcon,
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
  ChevronDoubleDownIcon,
} from '@heroicons/react/solid';
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/react';

function Header() {
  const { data: session } = useSession();
  return (
    <div className='sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm'>
      <Link href='/'>
        <a>
          <div className='relative h-14 w-24 flex-shrink-0 cursor-pointer'>
            <Image
              objectFit='contain'
              src='https://resistbay.com/wp-content/uploads/2022/07/resist-zoo-logo-diff.png'
              layout='fill'
              alt='Reddit Clone Logo'
            />
          </div>
        </a>
      </Link>
      <div className='mx-7 flex items-center xl:min-w-[300px]'>
        <HomeIcon className='h-5 w-5' />
        <p className='flex-1 ml-2 hidden lg:inline'>Home</p>
        <ChevronDownIcon className='h5 w-5' />
      </div>

      {/* Search Box */}
      <form className='flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1'>
        <SearchIcon className='h-6 w-6 text-gray-500' />
        <input
          className='flex-1 bg-transparent outline-none'
          type='text'
          placeholder='Search'
        />
        <button type='submit' className='' hidden />
      </form>
      <div className='text-gray-500 items-center space-x-2 hidden lg:inline-flex'>
        <SparklesIcon className='icon' />
        <GlobeIcon className='icon' />
        <VideoCameraIcon className='icon' />
        <hr className='h-10 border border-gray-100' />
        <ChatIcon className='icon' />
        <BellIcon className='icon' />
        <Link href='/submit'>
          <a>
            <PlusIcon className='icon' />
          </a>
        </Link>
        <SpeakerphoneIcon className='icon' />
      </div>
      <div className='ml-5 flex items-center lg:hidden'>
        <MenuIcon className='icon' />
      </div>
      {/*Sign In Sign Out Button */}
      {session ? (
        <div
          onClick={() => signOut()}
          className='hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex '
        >
          <div className='relative h-5 w-5 flex-shrink-0'>
            <Image
              objectFit='contain'
              src='https://links.papareact.com/23l'
              layout='fill'
              alt='sign in out button'
            />
          </div>
          <div className='flex-1 text-xs'>
            <p className='w-16 truncate'>{session?.user?.name}</p>
            <p className='text-gray-400'>1 Karma</p>
          </div>
          <ChevronDownIcon className='h-5 shrink-0 text-gray-400' />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className='hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex '
        >
          <div className='relative h-5 w-5 flex-shrink-0'>
            <Image
              objectFit='contain'
              src='https://links.papareact.com/23l'
              layout='fill'
              alt='sign in out button'
            />
          </div>
          <p className='text-gray-400'>Sign In</p>
        </div>
      )}
    </div>
  );
}

export default Header;
