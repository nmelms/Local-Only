import React from "react";

const StorePopup = ({ popupData }) => {
  return <div className="store-popup ">{popupData.properties.name}</div>;
};

export default StorePopup;
