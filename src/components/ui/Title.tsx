const Title = ({ text, className }: { text: string, className?: string }) => {
  return (
    <h1 className={`text-white text-4xl font-black md:mb-1 md:text-7xl ${className}`}>{ text }</h1>
  )
}

export default Title
