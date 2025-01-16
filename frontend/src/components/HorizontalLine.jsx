import React from 'react';

const HorizontalLine = ({ width = '100%', height = '1', color = 'rgb(217, 7, 0)' }) => {
  return (
    <hr
      style={{
        width: width === 'full' ? '100%' : width,
        height: height,
        backgroundColor: color,
        border: 'none',
      }}
    />
  );
};

export default HorizontalLine;
