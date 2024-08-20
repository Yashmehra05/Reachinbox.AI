import React from 'react';
import Icon from './Icons';

const MyComponent = () => {
  const handleClick = () => {
    console.log('Icon clicked!');
  };

  return (
    <div>
      <Icon currColor={true} color="blue" isActive={true} onClick={handleClick}>
        <span>🔍</span> {/* Example child, could be an SVG or FontAwesome icon */}
      </Icon>
      <Icon currColor={false} color="red" isActive={true} onClick={handleClick}>
        <span>🔔</span>
      </Icon>
    </div>
  );
};

export default MyComponent;
