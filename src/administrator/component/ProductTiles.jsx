import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import settingIcon from "../../assets/setting.svg";
import customerIcon from "../../assets/user.svg";
import salesIcon from "../../assets/sales.svg";
import stocksIcon from "../../assets/stocks.svg";
import { useNavigate } from "react-router-dom";

const ProductTiles = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([
    {
      imageUrl: settingIcon,
      title: "Products",
      description: "Management",
      urlPath: "/products/management",
    },
    {
      imageUrl: customerIcon,
      title: "Customers",
      description: "Management",
      urlPath: "/products/customers",
    },
    {
      imageUrl: salesIcon,
      title: "Vouchers",
      description: "Management",
      urlPath: "/vouchers/management",
    },
  ]);

  useEffect(() => {
    cards.forEach((card, index) => {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((prevCard, idx) =>
            idx === index ? { ...prevCard, isVisible: true } : prevCard
          )
        );
      }, index * 500); // Adjust the delay time here
    });
  }, []);

  const handleClick = (card) => {
    navigate(card.urlPath);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: card.isVisible ? 1 : 0,
            y: card.isVisible ? 0 : 50,
          }}
          transition={{ duration: 0.5 }}
          className={`bg-white rounded-lg hover:cursor-pointer shadow-md overflow-hidden ${
            card.isVisible ? "animate__animated animate__fadeIn" : ""
          }`}
          onClick={() => handleClick(card)}
        >
          <img
            src={card.imageUrl}
            alt={card.title}
            className="w-full h-24 object-cover object-center"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            <p className="text-gray-700">{card.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductTiles;
