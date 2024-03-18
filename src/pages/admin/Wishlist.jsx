import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Spinner, Table } from "keep-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Wishlist = () => {
  const { userDetails, user, token } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: wishlists,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["wishlists"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/package/wishlists/${userDetails._id}?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="my-10 flex justify-center">
        <Spinner color="info" size="xl" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-center text-xl font-bold">Something went wrong!</div>
    );
  }

  return (
    <Table
      showBorder={true}
      showBorderPosition="right"
      striped={true}
      hoverable={true}
    >
      <Table.Head>
        <Table.HeadCell className="px-2 py-1">Package name</Table.HeadCell>
        <Table.HeadCell className="px-2 py-1">Action</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {wishlists?.map((ele, idx) => (
          <TableRow
            key={"whtb" + idx}
            title={ele.package.title}
            packageId={ele.package._id}
            id={ele._id}
            refetch={refetch}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

const TableRow = ({ id, packageId, title, refetch }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, token } = useAuth();

  const handleVisitDetails = () => {
    navigate(`/package/${packageId}`);
  };
  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (isConfirmed) {
      Swal.fire({
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const { data } = await axiosSecure.delete(
          `/package/wishlist/${id}?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (data.message?.deletedCount) {
          Swal.fire({
            icon: "success",
            title: "Delete successfully",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "Something went wrong",
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          text: err,
        });
      } finally {
        refetch();
      }
    }
  };
  return (
    <Table.Row>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell className="p-1">
        <div className="flex items-center gap-2">
          <Button onClick={handleVisitDetails} color="primary" size="xs">
            Visit Details
          </Button>
          <Button onClick={handleDelete} color="error" size="xs">
            Delete
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

TableRow.propTypes = {
  id: PropTypes.string,
  packageId: PropTypes.string,
  title: PropTypes.string,
  refetch: PropTypes.func,
};

export default Wishlist;
