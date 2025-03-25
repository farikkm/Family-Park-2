const socialMediaIcons = [
  {
    id: 1,
    name: "Instagram",
    path: "instagram.svg",
    altVar: "instagram-icon",
    link: "https://www.instagram.com/family_park.uz?igsh=MTcxeW9hOWlhczd0Nw==",
    style: "",
  },
  {
    id: 2,
    name: "Telegram",
    path: "telegram.svg",
    altVar: "telegram-icon",
    link: "https://t.me/FAMILYPARK_by_MG",
    style: "",
  },
  {
    id: 3,
    name: "Youtube",
    path: "youtube.svg",
    altVar: "youtube-icon",
    link: "https://www.youtube.com/@family_park_uz",
    style: "flex justify-center items-center",
  },
  {
    id: 4,
    name: "Facebook",
    path: "facebook.svg",
    altVar: "facebook-icon",
    link: "https://www.facebook.com/share/1enMEju47S/?mibextid=LQQJ4d",
    style: "w-5!",
  },
  {
    id: 5,
    name: "TikTok",
    path: "tiktok.svg",
    altVar: "tiktok-icon",
    link: "https://www.tiktok.com/@familypark.uz?_t=ZS-8utTVeVXZky&_r=1",
    style: "",
  },
];

const SocialMediaIcons = ({ color }: { color: "white" | "normal" }) => {
  return (
    <>
      {socialMediaIcons.map((item) => (
        <a target="_blank" key={item.id} href={item.link} className={item.style}>
          <img src={`/icons/social-media/${color}/${item.path}`} alt={item.altVar} />
        </a>
      ))}
    </>
  );
};

const SocialMediaIconsRow = () => {
  return (
    <>
      {socialMediaIcons.map((item) => (
        <a target="_blank" href={item.link} key={item.id} className="flex gap-3 items-center">
          <img
            src={`/icons/social-media/normal/${item.path}`}
            alt={item.altVar}
            className={`w-6 ${item.style}`}
          />
          <span>{item.name}</span>
        </a>
      ))}
    </>
  );
};

export { SocialMediaIcons, SocialMediaIconsRow };
