import React from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabaseClient";

const page = async ({ params }) => {
  async function fetchShopById(shopId) {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .eq("id", shopId)
      .single();

    if (error) {
      console.log("there was an error");
      return null;
    }
    return data;
  }

  let shopData = await fetchShopById(params.id);
  return (
    <div className="coffee-shop-page">
      <Link href="/"> go back</Link>
      <img
        src={`https://xlvjgjhetfrtaigrimtd.supabase.co/storage/v1/object/public/${shopData.imageURL}
`}
        alt=""
      />
      <h2>{shopData.name}</h2>
    </div>
  );
};

export default page;
