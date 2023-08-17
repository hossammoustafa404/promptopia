const Waiting = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} w-9 h-9 rounded-full bg-red-500 waiting`} />
  );
};

export default Waiting;
