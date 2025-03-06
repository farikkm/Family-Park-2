export default function isMobileUtil() {
  let isMobileVar;
  if (window.innerHeight < 700 || window.innerWidth < 768) {
    isMobileVar = true
  } else {
    isMobileVar = false;
  }

  return isMobileVar;
}