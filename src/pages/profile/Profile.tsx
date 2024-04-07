import React, { ReactElement } from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Card from '../../components/Card/Card';
import './Profile.scss';
import FilledButton from '../../components/FilledButton/FilledButton';
import ProfileSection from '../../components/ProfileSection/ProfileSection';
import UserDetails from '../../components/UserDetails/UserDetails';
import TagList from '../../components/TagList/TagList';
import { ROUTES } from '../../routes/routes';
import actions from '../../store/actions';

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

  const navigate = useNavigate();
  const signOut = useSignOut();
  const dispatch = useDispatch();

  const handleDeleteTag = (index: number) => {
    // Implement delete tag logic here
    console.log('Deleting tag at index', index);
  };

  const handleSignOut = () => {
    dispatch(actions.signOut());
    signOut();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="profile-container">
      <div className="card-wrapper">
        <Card>
          <div className="card-content-container">
            <div className="card-header">
              <div className="card-header-text">Your profile</div>
              <div className="logout-button">
                <FilledButton
                  reverseGradient
                  onClick={handleSignOut}
                >
                  Log out
                </FilledButton>
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
            <ProfileSection title="Disliked ingredients">
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
