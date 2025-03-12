const Wrapper = ({ children, onLangChange }: { children: React.ReactNode, onLangChange: string }) => {
  return <div className="wrapper" key={onLangChange}>{children}</div>;
};

export default Wrapper;
