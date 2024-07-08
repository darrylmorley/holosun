// TODO - implement signin
import { signIn } from "@/lib/auth/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        title="Signin with Google"
      >
        Signin with Google
      </button>
    </form>
  );
}
