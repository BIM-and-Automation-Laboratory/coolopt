import React, { useEffect, useContext, useState } from "react";
import { useFormik } from "formik";

import SplitButton from "../SplitButton/SplitButton";
import { ModelDataContext } from "./ModelDataContext";
import { NotificationContext } from "../Notifications/NotificationContext";

export default function ChooseModels() {
  const [bucketModels, setBucketModels] = useState([]);

  const { selectionHandler } = useContext(ModelDataContext);

  const { createNotification } = useContext(NotificationContext);

  const formik = useFormik({
    initialValues: {
      bimModel: "Medical Facility",
    },
  });

  const getBucketModels = () => {
    return fetch("/api/forge/models")
      .then((response) => response.json())
      .then((data) => setBucketModels(data))
      .catch((err) => {
        createNotification({
          message: `"Could not list models. See the console for more details."`,
          status: "error",
        });
        console.log(err);
      });
  };

  const options = bucketModels.map((model) => ({
    value: model.name,
    label: model.name,
  }));

  useEffect(() => {
    getBucketModels();
  }, []);

  return (
    <SplitButton
      id="bimModel"
      placeholder="Choose a model"
      options={options}
      onChange={(value) => {
        formik.setFieldValue("bimModel", value.value);
        selectionHandler(bucketModels, value.value);
      }}
    />
  );
}
