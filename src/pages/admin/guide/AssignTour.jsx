import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Spinner, Table } from "keep-react";
import moment from "moment";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const AssignTour = () => {
  const { userDetails, user, token } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: assign,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["assign"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/package/booking/guide/${userDetails._id}?email=${user.email}`,
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
        <Table.HeadCell className="min-w-80 px-2 py-1">
          Package name
        </Table.HeadCell>
        <Table.HeadCell className="min-w-32 px-2 py-1">
          Tourist name
        </Table.HeadCell>
        <Table.HeadCell className="min-w-40 px-2 py-1">
          Tour date
        </Table.HeadCell>
        <Table.HeadCell className="min-w-20 px-2 py-1">
          Tour price
        </Table.HeadCell>
        <Table.HeadCell className="min-w-20 px-2 py-1">Status</Table.HeadCell>
        <Table.HeadCell className="px-2 py-1">Action button</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {assign?.map((ele, idx) => (
          <TableRow
            key={"whtb" + idx}
            id={ele._id}
            refetch={refetch}
            packageName={ele.package.title}
            touristName={ele.user.fullName}
            tourDate={ele.tourData}
            price={ele.price}
            status={ele.status}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

const TableRow = ({
  id,
  packageName,
  touristName,
  tourDate,
  price,
  status,
  refetch,
}) => {
  const axiosSecure = useAxiosSecure();
  const { user, token } = useAuth();
  const date = moment(tourDate).format("Do MMM YY, h:mm a");

  const handleStatus = async (statusData) => {
    try {
      const { data } = await axiosSecure.patch(
        `/package/booking/guide/${id}?email=${user.email}`,
        {
          status: statusData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Successful",
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
      <Table.Cell>{packageName}</Table.Cell>
      <Table.Cell>{touristName}</Table.Cell>
      <Table.Cell>{date}</Table.Cell>
      <Table.Cell>${price}</Table.Cell>
      <Table.Cell>{status}</Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-2">
          <Button
            color="primary"
            onClick={() => handleStatus("accepted")}
            disabled={
              status !== "review" || status === "rejected" ? true : false
            }
            size="xs"
          >
            Accept
          </Button>
          <Button
            color="error"
            onClick={() => handleStatus("rejected")}
            disabled={
              status !== "review" || status === "rejected" ? true : false
            }
            size="xs"
          >
            Reject
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

TableRow.propTypes = {
  id: PropTypes.string,
  packageName: PropTypes.string,
  touristName: PropTypes.string,
  tourDate: PropTypes.string,
  status: PropTypes.string,
  price: PropTypes.number,
  refetch: PropTypes.func,
};

export default AssignTour;
