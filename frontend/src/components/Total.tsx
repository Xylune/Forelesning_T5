export default function Total({ total }: { total: number }) {
    if (total === 0) return null;

    return <p>Total students: {total}</p>;
}
