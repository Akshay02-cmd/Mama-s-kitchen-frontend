const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
