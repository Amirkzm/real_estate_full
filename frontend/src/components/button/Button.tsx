type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={`primaryButton ${props.className || ""}`}>
      {children}
    </button>
  );
};

export default Button;
