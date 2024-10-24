import dynamic from "next/dynamic";

const Text = dynamic(() => import('remote/text').then((mod) => mod.default), {
    ssr: false,
});

export default function Page2() {

    return (
        <div>
            <Text />
            <h1>Page 2</h1>
        </div>
    );
}