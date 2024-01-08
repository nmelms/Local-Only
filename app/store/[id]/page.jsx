import React from "react";
import { supabase } from "@/app/api/shop-data/lib/supabaseClient";

const page = async ({ params }) => {
  async function fetchShopById(shopId) {
    console.log(shopId);
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
    <div>
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
