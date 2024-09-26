import React, { useState } from 'react';
import   './SideBar.css';
import { Link } from 'react-router-dom';

const SideBar = () => {
 
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLinkClick = (index) => {
    setActiveIndex(index);
  };
  const dashboardLinks = [
    {title: "Home", url: "/"},
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "Edit Profile", url: "/update" },
  ];


  return (
    <div className="--flex-start">
      <div className="left">
        {dashboardLinks.map(({ title, url }, index) => (
          <div className="--flex-center --dir-column" key={index}>
            <Link
              to={url}
              className={index === activeIndex ? "active-link" : ""}
              onClick={() => handleLinkClick(index)}
            >
              {title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;





