import { useParams } from "react-router-dom";

const getHref = (path: string) => {
  const { lng } = useParams()
  const url = new URL(path, window.location.origin);
  const segments = url.pathname.split("/").filter(Boolean);

  if (segments[0] === lng) {
    segments.shift(); // Убираем дублирующийся язык
  }

  return `/${lng}/${segments.join("/")}`;
};

export default getHref;