interface Props {
    color: string;
    selected: string;
    setSelected: (color: string) => void;
}

export default function ColorButton({ selected, color, setSelected }: Props) {
    return (
        <button
            key={color}
            type="button"
            className={`btn ${selected === color ? "active" : ""}`}
            onClick={() => setSelected(color)}
        >
            <div
                className="py-1 rounded"
                style={{
                    backgroundColor: color,
                    width: "32px",
                    height: "32px",
                }}
            />
        </button>
    );
}
