import { NextResponse } from "next/server";
import { supabase } from "./lib/supabaseClient";

export async function POST(res) {
  let data = await res.json();
  let geoJSON = {
    type: "Feature",
    geomentry_type: "Point",
    lat: 0,
    lng: 0,
    name: data.name,
    street: data.street,
    city: data.city,
    state: data.state,
    zip: data.zip,
    description: data.description,
  };

  const insertDataToSupabase = async (geoJSON) => {
    const { data, error } = await supabase
      .from("locations")
      .insert(geoJSON)
      .select("*");
    if (error) {
      return error;
    }
    return data;
  };

  const getLatLng = async (data) => {
    let number = data.street.replace(/ /g, "+");
    let address = ` ${data.city}, ${data.state} ${data.zip}`;
    let apiKey = process.env.NEXT_PUBLIC_GEOCOD_API_KEY;

    const url = `https://api.geocod.io/v1.7/geocode?q=${number}${encodeURIComponent(
      address
    )}&api_key=${apiKey}&limit=1`;

    let res = fetch(url, {
      method: "GET",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        return data.results[0].location;
      });

    return await res;
  };

  let LatLng = await getLatLng(data);
  geoJSON.lat = LatLng.lat;
  geoJSON.lng = LatLng.lng;
  const insertResult = await insertDataToSupabase(geoJSON);

  return NextResponse.json(insertResult);
}

export async function GET() {
  const { data, error } = await supabase.from("locations").select();

  return NextResponse.json(data);
}
