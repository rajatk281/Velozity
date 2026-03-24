import Avatar from "./Avatar";

type User = {
  name: string;
};

type AvatarGroupProps = {
  users: User[];
};

const AvatarGroup = ({ users }: AvatarGroupProps) => {
  return (
    <div className="flex -space-x-2">
      {users.map((user, index) => (
        <div
          key={index}
          className="border-2 border-white rounded-full"
          title={user.name} // 👈 tooltip on hover
        >
          <Avatar name={user.name} />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;