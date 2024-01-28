"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "react-bootstrap";
import Link from "next/link";
import toTitleCase from "../lib/toTitleCase";

const StorePopup = ({ popupData }: PopupStoreProps) => {
  const [shopData, setShopData] = useState<DatabaseShopData | null>(null);

  //have to fetch the imageURL from the database here
  useEffect(() => {
    fetch(`/api/shop-by-id?id=${popupData.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data: DatabaseShopData) => setShopData(data));
  }, [popupData]);

  return (
    <div className="store-popup container d-flex flex-column">
      <div className="row">
        <span className="popup-title p-2">
          {popupData.name && toTitleCase(popupData.name)}
        </span>
      </div>
      <div className="row flex-grow-1">
        <div className="col-6 img-wrapper h-100 ">
          {shopData && (
            <Image
              blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcNm3CHwAGQAK69Z58EgAAAABJRU5ErkJggg=="
              placeholder="blur"
              width={60}
              height={60}
              alt="coffee shop"
              src={`https://xlvjgjhetfrtaigrimtd.supabase.co/storage/v1/object/public/${shopData.imageURL}`}
              className="popup-image"
            />
          )}
        </div>

        <div className="col-6 d-flex justify-content-center align-items-center">
          <Link
            className="info-link rounded-pill"
            href={`/store/${shopData?.id}`}
          >
            Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StorePopup;
