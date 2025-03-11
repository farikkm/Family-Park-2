const Title = ({ text, className }: { text: string, className?: string }) => {
  return (
    <h1 className={`text-white text-4xl sm:text-5xl font-black md:mb-1 md:text-7xl 3xl:text-8xl ${className}`}>{ text }</h1>
  )
}

export default Title
