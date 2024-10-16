import { ChangeEvent, PropsWithChildren } from "react";

type FilterProps = {
    filter: string;
    options: { id: string; label: string; value: string }[];
    onFilterChange: (filter: string) => void;
};

export default function Filter({
    filter,
    options,
    onFilterChange,
}: PropsWithChildren<FilterProps>) {
    const handleFilter = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        onFilterChange(event.target.value);
    };
    return (
        <section className="filter">
            <select value={filter} onChange={handleFilter}>
                {[{ id: "default", label: "-", value: "" }, ...options].map(
                    ({ id, label, value }) => (
                        <option key={id} value={value}>
                            {label}
                        </option>
                    )
                )}
            </select>
        </section>
    );
}
