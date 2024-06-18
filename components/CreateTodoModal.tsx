import react, {useState} from "react";
import Modal from "@mui/material/Modal";

export const CreateTodoModal = () =>{
  const[open, setOpen] = useState<boolean>(false);
  const setClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={setClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <></>
      </Modal>


    </div>
  )

}