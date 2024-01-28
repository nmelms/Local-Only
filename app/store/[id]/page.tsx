import React from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";

const page = async ({ params }: PageProps) => {
  async function fetchShopById(shopId: number) {
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
      <h2>{shopData.name}</h2>
      <Image
        src={`https://xlvjgjhetfrtaigrimtd.supabase.co/storage/v1/object/public/${shopData.imageURL}
`}
        alt=""
        className="store-image"
        height={500}
        width={500}
      />

      <a
        href={`https://www.google.com/maps/?q=${shopData.lat},${shopData.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="navigate-btn rounded-pill"
      >
        Navigate
      </a>
    </div>
  );
};

export default page;
