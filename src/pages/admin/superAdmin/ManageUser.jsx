import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Spinner, Table } from "keep-react";
import moment from "moment";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const ManageUser = () => {
  const { user, token } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?email=${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        <Table.HeadCell className="min-w-44 px-2 py-1">
          User name
        </Table.HeadCell>
        <Table.HeadCell className="min-w-52 px-2 py-1">Status</Table.HeadCell>
        <Table.HeadCell className="min-w-72 px-2 py-1">Action</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {users?.map((ele, idx) => (
          <TableRow
            key={"ustb" + idx}
            fullName={ele.fullName}
            email={ele.email}
            role={ele.role}
            id={ele._id}
            createdAt={ele.createdAt}
            updatedAt={ele.updatedAt}
            refetch={refetch}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

const TableRow = ({
  fullName,
  email,
  role,
  id,
  createdAt,
  updatedAt,
  refetch,
}) => {
  const update = role !== "admin" ? false : true;
  const axiosSecure = useAxiosSecure();
  const { user, token } = useAuth();

  const userCreated = moment(createdAt).format("Do MMM YY, h:mm a");
  const userUpdated = moment(updatedAt).format("Do MMM YY, h:mm a");

  const handleChangeRole = async (roleName) => {
    try {
      const { data } = await axiosSecure.patch(
        `/user/${id}?email=${user.email}`,
        { role: roleName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.message?.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Updated",
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
  };

  return (
    <Table.Row>
      <Table.Cell>
        <div>
          <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
            {fullName}
          </p>
          <p>{email}</p>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div>
          <span className="font-bold">Role: </span>
          {role}
        </div>
        <div>
          <span className="font-bold">Create: </span>
          {userCreated}
        </div>
        <div>
          <span className="font-bold">Update: </span>
          {userUpdated}
        </div>
      </Table.Cell>
      <Table.Cell className="p-1">
        <div className="flex items-center gap-2">
          <Button
            disabled={update}
            onClick={() => handleChangeRole("admin")}
            color="primary"
            size="xs"
          >
            Make Admin
          </Button>
          <Button
            disabled={update}
            onClick={() => handleChangeRole("guide")}
            color="secondary"
            size="xs"
          >
            Make tour guide
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

TableRow.propTypes = {
  fullName: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
  id: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  refetch: PropTypes.func,
};

export default ManageUser;
