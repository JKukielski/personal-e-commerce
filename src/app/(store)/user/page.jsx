'use client';
import { useEffect, useState } from 'react';
import { useSession, useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';

export default function User() {
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testText, setTestText] = useState('');
  // The `useUser()` hook will be used to ensure that Clerk has loaded data about the logged in user
  const { user } = useUser();
  // The `useSession()` hook will be used to get the Clerk session object
  const { session } = useSession();

  // Create a custom supabase client that injects the Clerk Supabase token into the request headers
  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_KEY,
      {
        global: {
          // Get the custom Supabase token from Clerk
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: 'supabase',
            });
            console.log(`Clerk Token: ${clerkToken}`);

            // Insert the Clerk Supabase token into the headers
            const headers = new Headers(options?.headers);
            headers.set('Authorization', `Bearer ${clerkToken}`);

            // Now call the default fetch
            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      }
    );
  }

  // Create a `client` object for accessing Supabase data using the Clerk token
  const client = createClerkSupabaseClient();
  console.log(client);

  // This `useEffect` will wait for the User object to be loaded before requesting
  // the tasks for the logged in user
  useEffect(() => {
    if (!user) return;

    // async function loadTasks() {
    //   setLoading(true);
    //   const { data, error } = await client.from('tasks').select();
    //   if (!error) setTasks(data);
    //   setLoading(false);
    //   console.log(data);
    //   console.log(error);
    // }

    async function loadUserData() {
      setLoading(true);
      const { data, error } = await client.from('user-data').select();
      if (!error) {
        setUserData(data);
        console.log('Fetched data:', data); // Log here
      }
      setLoading(false);
      console.log('Error (if any):', error);
    }

    // loadTasks();
    loadUserData();
  }, [user]);

  useEffect(() => {
    console.log('Updated userData:', userData);
  }, [userData]);

  async function createTask(e) {
    e.preventDefault();
    // Insert task into the "tasks" database
    await client.from('user-data').insert({
      testText,
    });
    window.location.reload();
  }

  return (
    <div>
      <h1>Tasks</h1>

      {/* {loading && <p>Loading...</p>}

      {!loading &&
        tasks.length > 0 &&
        tasks.map((task) => <p key={task.id}>{task.name}</p>)}

      {!loading && tasks.length === 0 && <p>No tasks found</p>} */}
      {/* 
      {!loading &&
        userData.length > 0 &&
        userData.map((user) => <p key={user.id}>{user[0].city}</p>)}

      {!loading && userData.length === 0 && <p>No user data found</p>} */}

      <form onSubmit={createTask}>
        <input
          autoFocus
          type="text"
          name="name"
          placeholder="Enter new task"
          onChange={(e) => setTestText(e.target.value)}
          value={testText}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
