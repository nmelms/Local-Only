"use client";

import useUserStore from "../useUserStore";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "react-bootstrap";

const ProfilePage = () => {
  const supabase = createClientComponentClient();
  const { setUser, user } = useUserStore();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    console.log(user, "after setting user to null");
    router.push("/");
  };

  return (
    <div className="profile-page">
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
};

export default ProfilePage;
