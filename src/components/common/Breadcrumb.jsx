import { Link } from 'react-router-dom';

const Breadcrumb = ({ backTo, backText = '← Back' }) => {
  return (
    <div className="mb-6">
      <Link to={backTo} className="hover:underline" style={{ color: 'var(--primary-500)' }}>
        {backText}
      </Link>
    </div>
  );
};

export default Breadcrumb;
