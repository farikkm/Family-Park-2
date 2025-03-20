const socialMediaIcons = [
  {
    id: 1,
    name: "Instagram",
    path: "/icons/social-media/normal/instagram.svg",
    altVar: "instagram-icon",
    link: "https://www.instagram.com/family_park.uz?igsh=MTcxeW9hOWlhczd0Nw==",
    style: ""
  },
  {
    id: 2,
    name: "Telegram",
    path: "/icons/social-media/normal/telegram.svg",
    altVar: "telegram-icon",
    link: "https://t.me/FAMILYPARK_by_MG",
    style: ""
  },
  {
    id: 3,
    name: "Youtube",
    path: "/icons/social-media/normal/youtube.svg",
    altVar: "youtube-icon",
    link: "https://www.youtube.com/@family_park_uz",
    style: "flex justify-center items-center"
  },
  {
    id: 4,
    name: "Facebook",
    path: "/icons/social-media/normal/facebook.svg",
    altVar: "facebook-icon",
    link: "https://www.facebook.com/",
    style: "w-5!"
  },
  {
    id: 5,
    name: "TikTok",
    path: "/icons/social-media/normal/tiktok.svg",
    altVar: "tiktok-icon",
    link: "https://www.tiktok.com/",
    style: ""
  },
];

const whiteSocialMediaIcons = [
  {
    id: 1,
    name: "Instagram",
    path: "/icons/social-media/white/instagram.svg",
    altVar: "instagram-icon",
    link: "https://www.instagram.com/family_park.uz?igsh=MTcxeW9hOWlhczd0Nw==",
    style: ""
  },
  {
    id: 2,
    name: "Telegram",
    path: "/icons/social-media/white/telegram.svg",
    altVar: "telegram-icon",
    link: "https://t.me/FAMILYPARK_by_MG",
    style: ""
  },
  {
    id: 3,
    name: "Youtube",
    path: "/icons/social-media/white/youtube.svg",
    altVar: "youtube-icon",
    link: "https://www.youtube.com/@family_park_uz",
    style: "-mt-[2px]"
  },
  {
    id: 4,
    name: "Facebook",
    path: "/icons/social-media/white/facebook.svg",
    altVar: "facebook-icon",
    link: "https://www.facebook.com/",
    style: "w-fit!"
  },
  {
    id: 5,
    name: "TikTok",
    path: "/icons/social-media/white/tiktok.svg",
    altVar: "tiktok-icon",
    link: "https://www.tiktok.com/",
    style: ""
  },
];

const SocialMediaIcons = ({ color }: { color: string }) => {
  if (color === "white") {
    return (
      <>
        {whiteSocialMediaIcons.map((item) => (
          <a key={item.id} href={item.link} className={`${item.style}`}>
            <img src={item.path} alt={item.altVar} />
          </a>
        ))}
      </>
    );
  } else {
    return (
      <>
        {socialMediaIcons.map((item) => (
          <a key={item.id} href={item.link} className={`${item.style}`}>
            <img src={item.path} alt={item.altVar}  />
          </a>
        ))}
      </>
    );
  }
};

const SocialMediaIconsRow = () => {
  return (
    <>
      {socialMediaIcons.map((item) => (
        <a href={item.link} key={item.id} className="flex gap-3 items-center">
          <img src={item.path} alt={item.altVar} className={`w-6 ${item.style}`} />
          <span>{item.name}</span>
        </a>
      ))}
    </>
  );
};

export { SocialMediaIcons, SocialMediaIconsRow };
