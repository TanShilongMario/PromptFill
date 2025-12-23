// PremiumButton 元件 - 帶漸變效果的高階按鈕
import React, { useState } from 'react';
import { PREMIUM_STYLES } from '../constants/styles';

export const PremiumButton = ({ 
  onClick, 
  children, 
  className = "", 
  active = false, 
  disabled = false, 
  title, 
  icon: Icon, 
  color = "orange",
  hoverColor = null 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const currentColor = (isHovered && hoverColor) ? hoverColor : color;
  const premium = PREMIUM_STYLES[currentColor] || PREMIUM_STYLES.indigo;

  // Base classes
  const baseClasses = `
    flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale
    ${className}
  `;

  // Active/Hover styles using inline styles for premium look
  const style = (active || isHovered) && !disabled ? {
    background: `linear-gradient(135deg, ${premium.from} 0%, ${premium.to} 100%)`,
    boxShadow: `inset 0px 1px 2px 0px rgba(255, 255, 255, 0.3), 0 4px 12px ${premium.glowColor}`,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    transform: 'translateY(-1px)'
  } : {
    background: active ? '#EEF2FF' : 'white',
    border: '1px solid #E5E7EB',
    color: active ? premium.to : '#4B5563',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={baseClasses}
      style={style}
      title={title}
    >
      {Icon && <Icon size={16} />}
      {children && <span>{children}</span>}
    </button>
  );
};
