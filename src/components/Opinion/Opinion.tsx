/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import './Opinion.scss';
import { FaThumbsUp, FaThumbsDown, FaStar } from 'react-icons/fa';

interface OpinionProps {
  username: string;
  rating: number;
  createdAt: string;
  content: string;
  onLike: () => void;
  onDislike: () => void;
  onReport: () => void;
}

const Opinion = ({
  username,
  rating,
  createdAt,
  content,
  onLike,
  onDislike,
  onReport,
}: OpinionProps): JSX.Element => (
  <div className="opinion">
    <div className="header">
      <div className="user-info">
        <span className="username">{username}</span>
        <span className="rating">· {rating / 2}/5 </span>
        <FaStar className="star" />
      </div>
      <span className="date">
        {new Date(createdAt).toLocaleDateString('sv-SE')}
      </span>
    </div>
    <div className="content">{content}</div>
    <div className="footer">
      <button className="report-button" type="button" onClick={onReport}>
        Report
      </button>
      <div className="icons">
        <FaThumbsUp className="icon" onClick={onLike} />
        <FaThumbsDown className="icon" onClick={onDislike} />
      </div>
    </div>
  </div>
);

export default Opinion;
