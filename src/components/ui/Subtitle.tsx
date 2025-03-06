const Subtitle = ({ text, className }: { text: string, className?: string }) => {
  return (
    <span className={`text-white text-2xl font-normal ${className}`}>
      { text }
    </span>
  );
};

export default Subtitle;
