import './Buttons.css'
interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}
export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {

  return (
    <button className='button' onClick={onClick}>
      {children ? children : 'Click Me!'}
    </button>
  )
}