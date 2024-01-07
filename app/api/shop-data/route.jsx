import { NextResponse } from "next/server";

export async function POST(res) {
  let data = await res.json();

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
  console.log(LatLng, "latlng");
  // console.log(response, "this the res");
  // let json = await response.json();

  return NextResponse.json({ messsage: "hello" });
}
