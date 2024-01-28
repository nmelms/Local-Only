import React from "react";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div className="coffee-shop-page d-flex flex-column ">
      <Link href="/"> go back</Link>
      <FontAwesomeIcon size="2x" className="" icon={faCoffee} />
      <h2 className="text-center pt-4">{shopData.name}</h2>
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
      <img
        className="static-store-map"
        src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+999(${shopData.lng},${shopData.lat})/${shopData.lng},${shopData.lat},15/400x400?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
        alt="Map"
      />
      <p className="description-text">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt nihil
        laudantium et facere! Dolorem excepturi nam magnam ducimus recusandae
        facere corrupti cumque culpa quas natus fugit quibusdam unde eius
        commodi sit exercitationem laudantium quia temporibus, odio aperiam at,
        non ullam.
      </p>
    </div>
  );
};

export default page;
