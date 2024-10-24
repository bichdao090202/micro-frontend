import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Text = dynamic(() => import('remote/text').then((mod) => mod.default), {
    ssr: false,
});

export default function Page2() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div><b>Component use store's data from remote</b></div>
            <Text />
            <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-gray-500 text-white rounded"
            >
                return page 1
            </button>
        </div>
    );
}