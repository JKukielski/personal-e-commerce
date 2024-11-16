import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import CustomSignOutBtn from './CustomSignOutBtn';

export default async function Navbar() {
  // const navigate = useNavigate();
  const user = await currentUser();

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16  items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
          <Image src="/logo.svg" alt="project-logo" width={200} height={100} />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {' '}
                  About{' '}
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {' '}
                  Careers{' '}
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {' '}
                  History{' '}
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {' '}
                  Services{' '}
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/products"
                >
                  {' '}
                  Products{' '}
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {' '}
                  Blog{' '}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4 flex items-center">
              {/* <Link
                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                href="#"
              >
                Login
              </Link>

              <Link
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                href="#"
              >
                Register
              </Link> */}
              <SignedIn>
                <Link href="/user">
                  <Image
                    src={user?.imageUrl}
                    width={30}
                    height={30}
                    alt="user-profile-image"
                    className="rounded-full"
                  />
                </Link>
                <CustomSignOutBtn />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <Button>Zaloguj</Button>
                </SignInButton>
                <SignUpButton>
                  <Button variant="secondary">Zarejestruj</Button>
                </SignUpButton>
              </SignedOut>
            </div>

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
