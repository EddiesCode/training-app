import React, { useState, Dispatch, SetStateAction } from "react";
import Dialog from "react-native-dialog";

type AlertProps = {
  isOpen: boolean;
  setNumberOfSets: Dispatch<SetStateAction<number>>;
};

const EnterSets = ({ isOpen, setNumberOfSets }: AlertProps) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  const [sets, setSets] = useState<string>("");

  const handleCancel = (): void => {
    setOpen(false);
  };

  const handleContinue = (): void => {
    setOpen(false);
  };

  return (
    <Dialog.Container visible={open}>
      <Dialog.Title>Enter number of sets?</Dialog.Title>
      <Dialog.Description>
        {`Please enter how many sets you're planning to do.`}
      </Dialog.Description>
      <Dialog.Input
        inputMode="numeric"
        label="Enter a number"
        value={sets}
        onChangeText={(text) => {
          setSets(text);
          setNumberOfSets(Number(text));
        }}
      />
      <Dialog.Button label="Cancel" onPress={handleCancel} />
      <Dialog.Button label="Continue" onPress={handleContinue} />
    </Dialog.Container>
  );
};

export default EnterSets;
