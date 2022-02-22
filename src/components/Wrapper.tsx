const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="theme-light bg-bg text-primary tracking-wide h-full grow flex flex-col">
      {children}
    </div>
  );
};

export default Wrapper;
