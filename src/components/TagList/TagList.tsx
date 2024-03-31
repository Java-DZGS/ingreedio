import React from 'react';
import Tag from '../Tag/Tag';
import './TagList.scss';

type TagListProps = {
  tags: string[];
  color?: string;
  onDelete: (index: number) => void;
};

const TagList = ({
  tags,
  color = '#ccc',
  onDelete,
}: TagListProps): JSX.Element => (
  <div className="tag-list">
    {tags.map((tag, index) => (
      <Tag
        key={tag.split(' ').join('-')}
        text={tag}
        color={color}
        onDelete={() => onDelete(index)}
      />
    ))}
  </div>
);

export default TagList;
