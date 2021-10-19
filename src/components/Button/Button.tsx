import cn from 'classnames';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

export const Button = ({ children, className, appearance, size = 'small', ...props }: ButtonProps): JSX.Element => {
  return (
    <button className = {cn(styles.button, className, {
      [styles.primary]: appearance === 'primary',
      [styles.danger]: appearance === 'danger',
      [styles.outline]: appearance === 'outline',
      [styles.medium]: size === 'medium',
      [styles.small]: size === 'small',
    })} {...props}>
      { children }
    </button>
  )
}