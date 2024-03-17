import { Button } from "keep-react";
import Swal from "sweetalert2";

const Home = () => {
  const handleClick = () => {
    Swal.fire({
      icon: "success",
      title: "this is title",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Confirm",
    });
  };
  return (
    <div>
      <Button onClick={handleClick}>Click</Button>
    </div>
  );
};

export default Home;
