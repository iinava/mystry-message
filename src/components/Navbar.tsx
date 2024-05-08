'use client'
import { LogOut } from 'lucide-react';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { Send } from 'lucide-react';
function Navbar() {
  const { data: session } = useSession();
  const user : User = session?.user;
  

  return (
    <nav className="py-3 shadow-md bg--900 text-white ">
      <div className="container flex  md:flex-row justify-between sm:mx-[3vw]  w-full ">
        <a href="#" className="text-xl  mb-4 md:mb-0 font-bold flex mt-1 ">
     <span className='w-auto flex text-3xl font-bold'>🎭  </span>mystry message
        </a>
        {session ? (
          <>
            <span className="mr-4 hidden sm:block">
              Welcome, {user.username || user.email}
            </span>
            <Button onClick={() => signOut()} className=" bg-slate-100 text-black" variant='outline'>
            <LogOut />
            </Button>
          </>
        ) : (
          <Link href="/signin">
            <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;