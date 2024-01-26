import { ReactElement } from 'react'
import PropTypes from 'prop-types'
// import styles from './Button.module.css'
import { Button as ShadButton } from '@/components/ui/button'

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
  className = '',
  style = {},
  onClick,
}: {
  label: string
  highlight?: boolean | undefined
  className?: string | undefined
  style?: React.CSSProperties | undefined
  onClick: any
}): ReactElement {
  return (
    <ShadButton
      // className={`${styles.button} ${
      //   highlight && styles.highlight
      // } ${className}`}
      // style={style}
      onClick={() => onClick(label)}>
      {label}
    </ShadButton>
  )
}
