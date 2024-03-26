export default function generateAvatarColors(userId: string) {
  const getCorrectIndex = (number: number) => {
    return number > 255 ? 255 : number < 0 ? 0 : number;
  };
  
  const [r, g, b] = userId
    .substring(7, 10)
    .split("")
    .map((char) =>
      getCorrectIndex(char.charCodeAt(0) + Math.round(Math.random()) * 100)
    );

  return { r, g, b }
}
