import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { supabase } from "../../lib/supabaseClient";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const shopId = searchParams.get("id");

  async function fetchShopById(id: string) {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("there was an error");
      return null;
    }
    return data;
  }
  if (shopId) {
    let shopData = await fetchShopById(shopId);
    return NextResponse.json(shopData);
  }
}
