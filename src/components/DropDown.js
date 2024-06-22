export const DropDown = ({ isDroOpen, isOpen }) => {
  return (
    <>
      <>
        <button
          onClick={() => {
            isDroOpen(false);
            alert(isOpen);
          }}
        >
          X
        </button>
        <h1 style={{}}>DropDown Components</h1>
      </>
    </>
  );
};
