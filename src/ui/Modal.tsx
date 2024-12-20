const Modal = (icon: any, content: any) => {
  const openModal = () => {
    const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    } else {
      console.error("Modal element not found");
    }
  };

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={openModal}>
        {icon}
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div>
            {content}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Modal;
