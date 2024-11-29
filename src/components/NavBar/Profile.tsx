"use server";
import type { Session } from "next-auth";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/auth";

export default async function Profile({ profile }: { profile: Session }) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit" asChild>
          <button
            type="button"
            className="w-fit inline-flex rign-0 outline-none gap-2 items-center select-none"
          >
            <Image
              src={profile?.user?.image as string}
              alt="profile"
              width={40}
              height={40}
              className="rounded-md"
              draggable={false}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-2 mt-2">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="p-0">
              <button type="button" className="w-full hover:cursor-pointer p-2">
                A
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="p-0">
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
                className="w-full"
              >
                <button type="submit" className=" w-full text-start p-2">
                  Sign Out
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
