// Opinion.js
import React from 'react';
import './Opinion.scss';
import { FaThumbsUp, FaThumbsDown, FaStar } from 'react-icons/fa';

const Opinion = () => (
  <div className="opinion">
    <div className="header">
      <div className="user-info">
        <span className="username">JohnDoe</span>
        <span className="rating">· 8/10 </span>
        <FaStar className="star" />
      </div>
      <span className="date">2024-05-17</span>
    </div>
    <div className="content">
      This is an example opinion content. It is just a placeholder for the
      actual opinion text.
    </div>
    <div className="footer">
      <button className="report-button" type="button">
        Report
      </button>
      <div className="icons">
        <FaThumbsUp className="icon" />
        <FaThumbsDown className="icon" />
      </div>
    </div>
  </div>
);

export default Opinion;
