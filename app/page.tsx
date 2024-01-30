"use client";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import ShopOffcanvas from "./components/ShopOffcanvas";
import useUserStore from "./useUserStore";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

export default function Home() {
  const supabase = createClientComponentClient();
  const { setUser } = useUserStore();

  useEffect(() => {
    const user = supabase.auth.getUser();
    if (user) {
      setUser(user);
    }
    // setUser(session?.user || null);
  }, []);
  return <ShopOffcanvas />;
}
