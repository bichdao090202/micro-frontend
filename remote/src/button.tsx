import { useState } from "react";
import useStore from "./store";

export default function Button() {
    const { count, increase, decrease } = useStore();
    // const [count2, setCount] = useState(count);
    return (
        <div>
            {/* <button onClick={() => setCount(count + 1)}>Click me</button> */}
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
            <p>Count: {count}</p>
        </div>
    );
}