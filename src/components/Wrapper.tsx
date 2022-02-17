const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="theme-light bg-bg text-primary tracking-wide">
      {children}
    </div>
  );
};

export default Wrapper;
