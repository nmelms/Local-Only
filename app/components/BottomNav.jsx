"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserStore from "../useUserStore";

const BottomNav = () => {
  const { setShowOffcanvas, showOffcanvas } = useUserStore();
  const handleAddClick = () => {
    console.log("click");
    setShowOffcanvas(true);
    console.log(showOffcanvas);
  };
  return (
    <div className="container bottom-nav">
      <div className="row h-100 ">
        <div className="col-4 d-flex justify-content-center align-items-center">
          <FontAwesomeIcon
            onClick={() => handleAddClick()}
            className="plus-icon"
            icon={faPlus}
          />
        </div>
        <div className="col-8">col 6</div>
      </div>
    </div>
  );
};

export default BottomNav;
