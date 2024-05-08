const Button = ({ onClick, className, children }) => {
    return (
      <button onClick={onClick} className={`px-2 py-1 mx-3 my-1 rounded border border-gray-300 ${className}`}>
        {children}
      </button>
    );
  };
  
  export default Button;
  