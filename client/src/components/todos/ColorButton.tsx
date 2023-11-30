import { BsXCircle } from "react-icons/bs";

interface Props {
    color: string;
    selected: string;
    isCancelBtn: boolean;
    setSelected: (color: string) => void;
}

export default function ColorButton({
    selected,
    color,
    isCancelBtn,
    setSelected,
}: Props) {
    return (
        <>
            {isCancelBtn ? (
                <button
                    type="button"
                    className={`btn ${selected === "none" ? "active" : ""}`}
                    onClick={() => setSelected("none")}
                >
                    <BsXCircle
                        style={{
                            width: "32px",
                            height: "32px",
                        }}
                    />
                </button>
            ) : (
                <button
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
            )}
        </>
    );
}
