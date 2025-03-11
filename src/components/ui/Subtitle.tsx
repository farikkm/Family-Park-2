const Subtitle = ({ text, className }: { text: string, className?: string }) => {
  return (
    <span className={`text-white text-2xl sm:text-3xl 3xl:text-4xl font-normal ${className}`}>
      { text }
    </span>
  );
};

export default Subtitle;
