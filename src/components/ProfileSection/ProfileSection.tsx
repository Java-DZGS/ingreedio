import React from 'react';
import './ProfileSection.scss';

type CardProps = {
  children: React.ReactNode; // Content of the card
  title?: string;
};

const ProfileSection = ({ children, title = '' }: CardProps): JSX.Element => (
  <div className="profile-section-container">
    <div className="section-title">
      <h2>{title}</h2>
    </div>
    <hr className="title-line" />
    {children}
  </div>
);

export default ProfileSection;
