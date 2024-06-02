/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import './Description.scss';

interface DescriptionProps {
  description: string;
}

const Description: FC<DescriptionProps> = ({ description }) => {
  const paragraphs: string[] = description.split('\n\n\n');

  return (
    <div className="description">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          {paragraph.includes('·') || paragraph.includes('●') ? (
            <ul>
              {paragraph.split('\n\n').map((item, idx) => (
                <li key={idx}>{item.replace(/[●·]/g, '').trim()}</li>
              ))}
            </ul>
          ) : (
            paragraph
          )}
        </p>
      ))}
    </div>
  );
};

export default Description;
