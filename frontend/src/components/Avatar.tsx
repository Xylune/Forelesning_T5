type AvatarProps = {
    name: string;
};

export default function Avatar(props: AvatarProps) {
    const { name } = props;
    const firstLetter = name[0].toUpperCase();
    return <p className="avatar">{firstLetter}</p>;
}
