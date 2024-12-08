export function getAvatar(): string {
  const avatars = [
    "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/male/7.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/female/7.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/male/8.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/female/8.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/male/9.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/female/9.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/male/11.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/female/11.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/male/12.png",
    "https://d2u8k2ocievbld.cloudfront.net/memojis/female/12.png",
  ];

  const randomIndex = Math.floor(Math.random() * avatars.length);

  return avatars[randomIndex];
}
