import { NextResponse } from "next/server";

export async function POST(res) {
  let data = await res.json();
  let geoJSON = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [],
    },
    properties: {
      name: data.name,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
    },
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
  //geojson is ready to send all fields are currently required
  geoJSON.geometry.coordinates = [LatLng.lat, LatLng.lng];

  return NextResponse.json({ messsage: "hello" });
}
