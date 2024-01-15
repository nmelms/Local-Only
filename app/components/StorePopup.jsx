"use client";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";
import toTitleCase from "../lib/toTitleCase";

const StorePopup = ({ popupData }) => {
  const [shopData, setShopData] = useState();

  useEffect(() => {
    fetch(`/api/shop-by-id?id=${popupData.properties.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setShopData(data));
  }, [popupData]);

  console.log(shopData, "shop data");

  return (
    <div className="store-popup container d-flex flex-column">
      <div className="row">
        <span className="popup-title">
          {toTitleCase(popupData.properties.name)}
        </span>
      </div>
      <div className="row flex-grow-1">
        <div className="col-6 img-wrapper h-100 ">
          <img
            src={`https://xlvjgjhetfrtaigrimtd.supabase.co/storage/v1/object/public/${shopData?.imageURL}`}
            className="popup-image"
          />
        </div>

        <div className="col-6 d-flex justify-content-center align-items-center">
          <Link href={`/store/${shopData?.id}`}>Info</Link>
        </div>
      </div>
    </div>
  );
};

export default StorePopup;
