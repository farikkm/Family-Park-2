export default function isMobileUtil() {
  let isMobileVar;
  if (window.innerWidth < 768) {
    isMobileVar = true
  } else {
    isMobileVar = false;
  }

  return isMobileVar;
}