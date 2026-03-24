const colors = [
  "bg-pink-500",
  "bg-purple-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-orange-500"
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

const getColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

type AvatarProps = {
  name: string;
};

const Avatar = ({ name }: AvatarProps) => {
  return (
    <div
      className={`w-8 h-8 rounded-full ${getColor(name)} flex items-center justify-center text-white text-xs font-semibold`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;