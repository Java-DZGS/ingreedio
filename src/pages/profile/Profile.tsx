import React, { ReactElement, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import './Profile.scss';
import FilledButton from '../../components/FilledButton/FilledButton';
import ProfileSection from '../../components/ProfileSection/ProfileSection';
import UserDetails from '../../components/UserDetails/UserDetails';
import TagList from '../../components/TagList/TagList';
import { ROUTES } from '../../routes/routes';
import actions from '../../store/actions';
import { RootState } from '../../store/reducers';
import { IngredientObject } from '../../services/ingredients.service';

// eslint-disable-next-line arrow-body-style
const Profile = (): ReactElement => {
  const { likedIngredients, dislikedIngredients } = useSelector(
    (state: RootState) => state.like,
  );
  const { displayName, email, username } = useSelector((state: RootState) => state.user);
  const userData = useMemo(
    () => [
      { title: 'Display Name', value: displayName },
      { title: 'Username', value: username },
      { title: 'Email', value: email },
    ],
    [displayName, username, email],
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteLiked = (ingredient: string) => {
    dispatch(actions.unlikeIngredient(ingredient));
  };

  const handleDeleteDisliked = (ingredient: string) => {
    dispatch(actions.undislikeIngredient(ingredient));
  };

  const handleSignOut = () => {
    dispatch(actions.signOut());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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
                <FilledButton reverseGradient onClick={handleSignOut}>
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
                  tags={likedIngredients.map((ingr: IngredientObject) => ingr.name)}
                  onDelete={handleDeleteLiked}
                  color="rgba(135, 185, 255, 0.47)"
                />
              </div>
            </ProfileSection>
            <ProfileSection title="Disliked ingredients">
              <div className="inner-tags-container">
                <TagList
                  tags={dislikedIngredients.map((ingr: IngredientObject) => ingr.name)}
                  onDelete={handleDeleteDisliked}
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
