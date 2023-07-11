import React from "react";
import Dialog from "react-native-dialog";

import exerciseStore from "../store/exerciseStore/exerciseStore";
import workoutStore from "../store/workoutStore/workoutStore";

const Alert = ({ showAlert, setShowAlert }) => {
  const handleCancel = () => {
    setShowAlert(false);
  };

  const handleDelete = () => {
    exerciseStore.clearStoredData();
    workoutStore.clearStoredData();
    setShowAlert(false);
  };

  return (
    <Dialog.Container visible={showAlert}>
      <Dialog.Title>Clear local storage</Dialog.Title>
      <Dialog.Description>
        {`Clearing the local storage will remove all your custom exercises.\nAre you sure you want to continue?`}
      </Dialog.Description>
      <Dialog.Button label="Cancel" onPress={handleCancel} />
      <Dialog.Button label="Clear" onPress={handleDelete} />
    </Dialog.Container>
  );
};

export default Alert;
