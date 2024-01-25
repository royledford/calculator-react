import PropTypes from 'prop-types'
import styles from './Button.module.css'

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  highlight: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

// Display a calculator button
export default function Button({
  label,
  highlight = false,
  onClick,
  className,
  style,
}) {
  return (
    <button
      className={`${styles.button} ${
        highlight && styles.highlight
      } ${className}`}
      style={style}
      onClick={() => onClick(label)}>
      {label}
    </button>
  )
}
