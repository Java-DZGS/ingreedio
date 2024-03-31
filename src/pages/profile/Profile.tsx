import React, { ReactElement } from 'react';
import Card from '../../components/Card/Card';
import './Profile.scss';
import FilledButton from '../../components/FilledButton/FilledButton';
import ProfileSection from '../../components/ProfileSection/ProfileSection';
import UserDetails from '../../components/UserDetails/UserDetails';
import TagList from '../../components/TagList/TagList';

// eslint-disable-next-line arrow-body-style
const Profile = (): ReactElement => {
  const userData = [
    { title: 'Display Name', value: 'John Doe' },
    { title: 'Username', value: 'johndoe123' },
    { title: 'Email', value: 'johndoe@example.com' },
  ];

  const tags = [
    'dupa',
    'dupa',
    'dupa',
    'dupa',
    'dupa',
    'dupa',
    'dupa',
    'dupa',
    'dupa',
    'dupa',
    'dupa',
    'dupa',
    'dupa',
    'dupa',
    'dupa',
    'dupa',
    'dupa',
    'dupa',
  ];
  const handleDeleteTag = (index: number) => {
    // Implement delete tag logic here
    console.log('Deleting tag at index', index);
  };
  return (
    <div className="profile-container">
      <div className="card-wrapper">
        <Card>
          <div className="card-content-container">
            <div className="card-header">
              <div className="card-header-text">Your profile</div>
              <div className="logout-button">
                <FilledButton reverseGradient>Log out</FilledButton>
              </div>
            </div>
            <ProfileSection title="Account data">
              <div className="user-details-container">
                <UserDetails data={userData} />
              </div>
            </ProfileSection>
            <ProfileSection title="Liked ingredients">
              <div className="inner-tags-container">
                <TagList
                  tags={tags}
                  onDelete={handleDeleteTag}
                  color="rgba(135, 185, 255, 0.47)"
                />
              </div>
            </ProfileSection>
            <ProfileSection title="Disiked ingredients">
              <div className="inner-tags-container">
                <TagList
                  tags={tags}
                  onDelete={handleDeleteTag}
                  color="rgba(255, 171, 135, 0.47)"
                />
              </div>
            </ProfileSection>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
