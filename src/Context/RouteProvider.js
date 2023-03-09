import React, {useState} from 'react';


export const RouteContext = React.createContext();

export default function RouteProvider({children}) {
  const [route, setRoute] = useState('Books');
  const [infoModalVisible, setInfoModalVisible] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(null);
  const [update, setUpdate] = useState(false);
  return (
    <RouteContext.Provider
      value={{
        route,
        setRoute,
        infoModalVisible,
        setInfoModalVisible,
        addModalVisible,
        setAddModalVisible,
        update,
        setUpdate
      }}
    >
      {children}
    </RouteContext.Provider>
  )
}
