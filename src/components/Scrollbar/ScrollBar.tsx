import React, { ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

type ScrollBarProps = {
  className?: string;
  children?: ReactNode;
};

const ScrollBar = ({ children, className = '' }: ScrollBarProps): JSX.Element => (
  <Scrollbars
    className={className}
    renderThumbVertical={({ style, ...props }) => (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        style={{
          ...style,
          backgroundColor: 'rgba(29, 108, 226, 0.27)',
          borderRadius: 10,
        }}
      />
    )}
    renderTrackVertical={({ style, ...props }) => (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        style={{
          ...style,
          backgroundColor: 'rgba(29, 108, 226, 0.17)',
          borderRadius: 10,
          height: '100%',
          top: 0,
          right: 0,
        }}
      />
    )}
  >
    {children}
  </Scrollbars>
);

export default ScrollBar;
