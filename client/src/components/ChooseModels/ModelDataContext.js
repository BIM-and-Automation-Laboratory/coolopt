import { createContext, useEffect, useState } from "react";

const ModelDataContext = createContext();

const ModelDataContextProvider = ({ children }) => {
  const [viewableUrn, setViewableUrn] = useState(
    "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y29vbG9wdC1wb2MtYnVja2V0L01lZGljYWwlMjBGYWNpbGl0eS5ydnQ"
  );

  const selectionHandler = (bucketModels, chosenModel) => {
    setViewableUrn(
      bucketModels?.find((model) => model.name === chosenModel)?.urn
    );
    console.log(
      bucketModels?.find((model) => model.name === chosenModel)?.urn,
      chosenModel
    );
  };

  return (
    <ModelDataContext.Provider value={{ viewableUrn, selectionHandler }}>
      {children}
    </ModelDataContext.Provider>
  );
};

export { ModelDataContext, ModelDataContextProvider };
