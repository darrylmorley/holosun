import { auth, signIn, signOut } from "@/lib/auth/auth";

function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <p>You are not logged in</p>
      <button type="submit">Sign in with Google</button>
    </form>
  );
}

function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <p>{children}</p>
      <button type="submit">Sign out</button>
    </form>
  );
}

export default async function Page() {
  const session = await auth();
  const user = session?.user?.email;

  return (
    <section>
      <h1>Home</h1>
      <div>{user ? <SignOut>{`Welcome ${user}`}</SignOut> : <SignIn />}</div>
    </section>
  );
}