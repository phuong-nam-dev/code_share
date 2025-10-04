"use client";

import { authClient } from "@/lib/auth/auth-client";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const isPageLogin = pathname.includes("/auth/login");

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <header className="bg-gray-800 text-white p-4 min-h-[72px]">
      <div className="container mx-auto flex justify-between items-center min-h-10">
        <Link href="/" className="text-2xl font-bold">
          CodeShare
        </Link>
        <nav>
          {/* <a href="#" className="px-4">
            Home
          </a>
          <a href="#" className="px-4">
            Profile
          </a> */}
          <>
            {!isPending && (
              <>
                {session == null ? (
                  <>
                    {!isPageLogin && (
                      <Button asChild size="lg">
                        <Link href="/auth/login">Sign In / Sign Up</Link>
                      </Button>
                    )}
                  </>
                ) : (
                  <div
                    className="px-4 min-h-10 flex items-center justify-center cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                )}
              </>
            )}
          </>
        </nav>
      </div>
    </header>
  );
};

export default Header;
