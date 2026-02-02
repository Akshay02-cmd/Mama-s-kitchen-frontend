const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ color: 'var(--gray-700)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
