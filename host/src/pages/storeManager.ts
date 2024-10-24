type RemoteStores = {
  counterStore: any;
  nameStore: any;
};

const remoteStores: RemoteStores = {
  counterStore: null,
  nameStore: null,
};

export const initializeRemoteStores = async () => {
  try {
    // Load remote stores
    const [counterStore, nameStore] = await Promise.all([
      import('remote/store'),
      import('remote2/store')
    ]);
    
    remoteStores.counterStore = counterStore.default;
    remoteStores.nameStore = nameStore.default;
    
    return remoteStores;
  } catch (error) {
    console.error('Failed to initialize remote stores:', error);
    throw error;
  }
};

export const getRemoteStores = () => remoteStores;