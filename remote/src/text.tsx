import useStore from "./store";

export default function Text() {
    const { count} = useStore();
    return (
        <div>
            <h1>{count}</h1>
        </div>
    );
}