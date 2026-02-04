const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-2 h-12 rounded-full" style={{ background: 'linear-gradient(180deg, var(--primary-600) 0%, var(--primary-500) 100%)' }}></div>
        <h1 className="text-5xl font-bold" style={{ color: 'var(--gray-900)' }}>
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className="text-lg ml-6 pl-4" style={{ color: 'var(--gray-600)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
