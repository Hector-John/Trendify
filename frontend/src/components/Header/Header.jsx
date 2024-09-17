import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerContent">
        <h2>
          Order your favorite <span>kicks</span> here
        </h2>
        <p>
          Welcome to <span>trendify</span>, where style meets comfort. Whether
          you're searching for the perfect pair of sneakers, boots, or sandals,
          we've got you covered. Explore our extensive collection and step into
          fashion-forward footwear that suits your every stride. With quality
          craftsmanship and trendy designs, finding your next favorite pair of
          kicks has never been easier. Start browsing now and elevate your shoe
          game!
        </p>
        <button>Veiw Categories</button>
      </div>
    </div>
  );
};

export default Header;
