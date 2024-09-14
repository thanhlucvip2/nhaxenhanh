import { useNotification } from "src/hooks/useNotification";

export const FileUpload = () => {
  const { addNotification } = useNotification();
  return (
    <>
      <button
        onClick={() => {
          addNotification({ message: "dasdas", type: "error" });
        }}
      >
        file manage
      </button>
    </>
  );
};
