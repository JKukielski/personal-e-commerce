'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UserImage({ user }) {
  const [pathname, setPathName] = useState('');

  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);

  if (pathname == '/user') {
    return null;
  }

  return (
    <Link href="/user">
      <Image
        src={user?.imageUrl}
        width={30}
        height={30}
        alt="user-profile-image"
        className="rounded-full"
      />
    </Link>
  );
}
