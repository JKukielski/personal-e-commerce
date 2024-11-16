import { currentUser } from '@clerk/nextjs/server';

export default async function page() {
  const user = await currentUser();

  return (
    <div>
      <h1>{`Hello ${user?.firstName}!`}</h1>
    </div>
  );
}
