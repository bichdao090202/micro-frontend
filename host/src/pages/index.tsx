// import { useEffect, useState } from 'react';
// export default function Home() {
//   // const [count, setCount] = useState<number | null>(null);
//   // const increase = useStore((state) => state.increase);
//   // const decrease = useStore((state) => state.decrease);

//   // useEffect(() => {
//   //   const loadStore = async () => {
//   //     const store = (await import('remote/store')).default;
//   //     setCount(store.getState().count);
//   //     store.subscribe((state: any) => {
//   //     });
//   //   };
//   //   loadStore();
//   // }, []);

// return (
//   <div>
//     <h1>Host</h1>
//     <p>Host page</p>
//     {/* count: {count}
//     <h1>Count: {count}</h1> */}
//       {/* <button onClick={increase}>Increase</button>
//       <button onClick={decrease}>Decrease</button> */}
//   </div>
// );
// }

import { useEffect } from 'react';
import useStore from './store';
import { initializeRemoteStores, getRemoteStores } from './storeManager';

export default function Home() {
  const { count, name, increase, decrease, updateName, isStoreLoaded, setStoreLoaded } = useStore();

  useEffect(() => {
    const initializeStores = async () => {
      try {
        await initializeRemoteStores();
        const { counterStore, nameStore } = getRemoteStores();

        // Set initial values
        useStore.setState({
          count: counterStore.getState().count,
          name: nameStore.getState().name,
        });

        // Subscribe to remote stores
        counterStore.subscribe((state: any) => {
          useStore.setState({ count: state.count });
        });

        nameStore.subscribe((state: any) => {
          useStore.setState({ name: state.name });
        });

        setStoreLoaded(true);
      } catch (error) {
        console.error('Failed to initialize stores:', error);
      }
    };

    initializeStores();
  }, [setStoreLoaded]);

  if (!isStoreLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h2>Counter: {count}</h2>
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>Decrease</button>
      </div>
      
      <div>
        <h2>Name: {name}</h2>
        <input 
          type="text" 
          value={name}
          onChange={(e) => updateName(e.target.value)}
        />
      </div>
    </div>
  );
}