import { auth, signIn } from "@/auth";
import Profile from "./Profile";

export default async function NavBar() {
  const session = await auth();

  return (
    <header className="w-full flex p-8 justify-between ">
      <h1 className="text-2xl font-[500]">NextType</h1>
      {session?.user ? (
        <Profile profile={session} />
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button type="submit">Signin</button>
        </form>
      )}
    </header>
  );
}
