import { Button } from "flowbite-react";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%,-50%)",
        backgroundColor: 'whitesmoke',
    },
};
Modal.setAppElement('#root');

const DeleteModal = ({ isOpen, onRequestClose, onDelete }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => onRequestClose()}
            style={customStyles}
        >
            <div className="text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this product?
                </h3>
                <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={() => {
                        onDelete()
                    }}>
                        {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={() => onRequestClose()}>
                        No, cancel
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteModal;