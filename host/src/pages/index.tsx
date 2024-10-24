// const Button = dynamic(() => import('remote/button').then((mod) => mod.default), {
//   ssr: false,
// })

// const printNumber = dynamic(() => import('remote/printNumber').then((mod) => mod.default), {
//   ssr: false,
// })

// const loadPrintNumber = async (number: number) => {
//   const printNumber = (await import('remote/printNumber')).default;
//   printNumber(number);
// };


// export default function Home() {
//   const router = useRouter();
//   const [count, setCount] = useState<number | null>(null);
//   const [useStore, setUseStore] = useState<any>(null);

//   const increaseCount = async () => {
//     if (useStore) {
//       const store = useStore.getState().increase();
//     }
//   };

//   const decreaseCount = async () => {
//     if (useStore) {
//       const store = useStore.getState().decrease();
//     }
//   };
//   useEffect(() => {
//     const loadStore = async () => {
//       const store = (await import('remote/store')).default;
//       setUseStore(store);
//       setCount(store.getState().count);
      
//       store.subscribe((state: any) => {
//         setCount(state.count);
//       });
//     };
//     loadStore();
//     return () => {
//       if (useStore) {
//         useStore.destroy();
//       }
//     };
//   }, []);
// }






import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
let storeModule: any = null;
let storeName: any =null;
export default function Home() {
  const router = useRouter();
  const [count, setCount] = useState<number>(0);
  const [isStoreLoaded, setIsStoreLoaded] = useState(false);
  const [nameStore, setNameStore] = useState<string>('');
  const [isStoreName, setIsStoreName] = useState(false);
  const [inputValue, setInputValue] = useState('');


  useEffect(() => {
    const loadStore = async () => {
      if (!storeModule) {
        const loaded = await import('remote/store');
        storeModule = loaded.default;
      }
      setIsStoreLoaded(true);
      setCount(storeModule.getState().count);

      const unsubscribe = storeModule.subscribe((state: any) => {
        setCount(state.count);
      });

      return () => {
        unsubscribe();
      };
    };

    loadStore();
  }, []);

  useEffect(() => {
    const loadStore2 = async () => {
      if (!storeName) {
        const loaded = await import('remote2/store');
        storeName = loaded.default;
      }
      setIsStoreName(true);
      setNameStore(storeName.getState().name);

      const unsubscribe = storeName.subscribe((state: any) => {
        setNameStore(state.name);
      });

      return () => {
        unsubscribe();
      };
    };

    loadStore2();
  }, []);

  const increaseCount = () => {
    if (storeModule) {
      storeModule.getState().increase();
    }
  };

  const decreaseCount = () => {
    if (storeModule) {
      storeModule.getState().decrease();
    }
  };

  const setNameAction = () => {
    if (storeName) {
      storeName.getState().updateName(inputValue);
    }
  }

  if (!isStoreLoaded && !isStoreName) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
 
  <div><b>Using Dispatch Action from remote store</b></div>

  <div>count: {count}</div>

  <div className="flex gap-4">
    <button 
      onClick={increaseCount}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      increase
    </button>
    <button 
      onClick={decreaseCount}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      decrease
    </button>
    <button 
      onClick={() => router.push('/page2')}
      className="px-4 py-2 bg-gray-500 text-white rounded"
    >
      navigate
    </button>
    <div> 
    
      
       </div>
  </div>

<hr></hr>

  <div><b>Using Dispatch Action from remote store2</b></div>
    <div>name: {nameStore}</div>
    <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Type something..."
        className="px-4 py-2 border rounded"
      />
      <button 
        onClick={setNameAction} 
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Update
      </button>
  <div>
  
  </div>
</div>

  );
}






// 'use client';

// import { useRouter } from "next/navigation";
// import { useEffect, useState, useRef } from "react";

// interface Store {
//   count: number;
//   increase: () => void;
//   decrease: () => void;
// }

// export default function Home() {
//   const router = useRouter();
//   const [count, setCount] = useState<number | null>(null);
//   const storeRef = useRef<any>(null);
//   const unsubscribeRef = useRef<() => void>();

//   useEffect(() => {
//     const initStore = async () => {
//       try {
//         const storeModule = (await import('remote/store')).default;
//         storeRef.current = storeModule;
//         setCount(storeModule.getState().count);
      
//         const unsubscribe = storeModule.subscribe((state: Store) => {
//           setCount(state.count);
//         });
        
//         unsubscribeRef.current = unsubscribe;
//       } catch (error) {
//         console.error('Failed to load store:', error);
//       }
//     };

//     initStore();
//     return () => {
//       if (unsubscribeRef.current) {
//         unsubscribeRef.current();
//       }
//     };
//   }, []);

//   const increaseCount = () => {
//     if (storeRef.current) {
//       storeRef.current.getState().increase();
//     }
//   };

//   const decreaseCount = () => {
//     if (storeRef.current) {
//       storeRef.current.getState().decrease();
//     }
//   };

//   return (
//     <div
//       className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
//     >
//       <button 
//         onClick={increaseCount}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         increase
//       </button>

//       <button 
//         onClick={decreaseCount}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         decrease
//       </button>

//       <div>count: {count ?? 'Loading...'}</div>

//       <button 
//         onClick={() => router.push('/page2')}
//         className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//       >
//         navigate
//       </button>
//     </div>
//   );
// }