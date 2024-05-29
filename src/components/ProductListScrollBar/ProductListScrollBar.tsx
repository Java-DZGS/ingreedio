import React, { ReactNode, useCallback } from 'react';
import Scrollbars, { positionValues } from 'react-custom-scrollbars-2';

type ScrollBarProps = {
  className?: string;
  children?: ReactNode;
  onLoadMore?: () => void;
  onScroll?: () => void;
};

const ProductListScrollBar = ({
  children,
  className = '',
  onLoadMore,
}: ScrollBarProps): JSX.Element => {
  const handleScroll = (values: positionValues) => {
    const { scrollTop, scrollHeight, clientHeight } = values;

    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    console.log(distanceFromBottom);

    if (distanceFromBottom < 50) {
      if (onLoadMore) {
        onLoadMore();
      }
    }
  };

  return (
    <Scrollbars
      className={className}
      renderTrackHorizontal={() => <div style={{ display: 'none' }} />}
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
      onScrollFrame={handleScroll}
    >
      {children}
    </Scrollbars>
  );
};

export default ProductListScrollBar;
