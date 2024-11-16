'use client';
import { useClerk } from '@clerk/nextjs';
import { Button } from './ui/button';

export default function CustomSignOutBtn() {
  const { signOut } = useClerk();
  return <Button onClick={() => signOut({ redirectUrl: '/' })}>Wyloguj</Button>;
}
