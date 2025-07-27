import React from "react";

const Header = ({ title }) => {
  return (
    <div className="w-100 py-2 px-4 d-flex align-items-center justify-content-between">
      <h5 className="m-0">{title}</h5>
    </div>
  );
};

export default Header;
