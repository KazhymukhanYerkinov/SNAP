import React from 'react';

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode,
  appearance: 'primary' | 'danger' | 'outline',
  size?: 'medium' | 'small',
}