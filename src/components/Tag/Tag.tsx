// Tag.tsx
import React from 'react';
import './Tag.scss';
import deleteIcon from '../../assets/icons/delete.svg';

type TagProps = {
  text: string;
  color?: string;
  onDelete: () => void;
};

const Tag = ({ text, color = '#ccc', onDelete }: TagProps): JSX.Element => (
  <div className="tag" style={{ backgroundColor: color }}>
    <span className="tag-text">{text}</span>
    <button className="delete-button" type="button" onClick={onDelete}>
      <img src={deleteIcon} alt="delete" width={10} height={10} />
    </button>
  </div>
);

export default Tag;
