import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({
          redirectTo: "/",
        });
      }}
    >
      <Button type="submit">Sign Out!</Button>
    </form>
  );
}
