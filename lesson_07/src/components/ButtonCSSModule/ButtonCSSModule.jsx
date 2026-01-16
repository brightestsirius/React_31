import React from 'react';
import styles from './ButtonCSSModule.module.sass';

const ButtonCSSModule = ({ onClick, children, variant = 'default' }) => {
  const buttonClasses = `${styles.button} ${variant === 'primary' ? styles.primary : ''}`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonCSSModule;