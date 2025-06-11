import Button from "../Button/Button";

export default function TabButton({ children, onSelect, isSelected, text }) {
    function handleClick() {
        console.log("helo");
    }
    return (
        <li>
            <Button variant={isSelected ? 'important': undefined} onClick={onSelect} text={text}>{children}</Button>
        </li>
    );

}