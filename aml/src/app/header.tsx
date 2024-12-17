import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";

import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export async function Header() {
  const session = await auth();

  return (
    <div className="bg-gray-100 border-b py-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and text on the left side */}
        <div>
          <Link href="/">
            <Image src="/Logo.png" alt="Logo" width={100} height={100} />
          </Link>
          <span className="font-bold text-xl">Advanced Media Library</span>
          <Button variant="link" asChild>
            <Link href="/Explore">Explore</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/Support">Support</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/">Add Item</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div>{session?.user?.name}</div>
          <div>{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
}
