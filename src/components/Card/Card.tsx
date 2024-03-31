import React from 'react';
import './Card.scss'; // Import CSS file for styling

interface Card {
  children: React.ReactNode; // Content of the card
}

const CustomCard: React.FC<Card> = ({ children }) => (
  <div className="card">{children}</div>
);

export default CustomCard;
