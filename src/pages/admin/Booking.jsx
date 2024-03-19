import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Spinner, Table } from "keep-react";
import moment from "moment";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const Booking = () => {
  const { userDetails, user, token } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: bookings,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/package/booking/${userDetails._id}?email=${user.email}`,
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

  const bookedPackageCount = bookings?.filter(
    (ele) => ele.status !== "rejected" && true,
  );

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
          Tour guide name
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
        {bookings?.map((ele, idx) => (
          <TableRow
            key={"whtb" + idx}
            refetch={refetch}
            id={ele._id}
            packageName={ele.package.title}
            guideName={ele.guide.fullName}
            tourDate={ele.tourData}
            price={ele.price}
            bookingCount={bookedPackageCount.length}
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
  guideName,
  tourDate,
  price,
  status,
  bookingCount,
  refetch,
}) => {
  const axiosSecure = useAxiosSecure();
  const { user, token } = useAuth();
  const date = moment(tourDate).format("Do MMM YY, h:mm a");

  const handleCancel = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (isConfirmed) {
      try {
        Swal.fire({
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const { data } = await axiosSecure.delete(
          `/package/booking/${id}?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (data.success) {
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
      <Table.Cell>{packageName}</Table.Cell>
      <Table.Cell>{guideName}</Table.Cell>
      <Table.Cell>{date}</Table.Cell>
      <Table.Cell>${price}</Table.Cell>
      <Table.Cell>{status}</Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-2">
          {status !== "rejected" && (
            <Button
              color="primary"
              disabled={bookingCount > 3 ? false : true}
              size="xs"
            >
              Apply
            </Button>
          )}
          {status === "accepted" && (
            <Button color="primary" variant="outline" size="xs">
              Pay
            </Button>
          )}
          {status === "review" && (
            <Button onClick={handleCancel} color="error" size="xs">
              Cancel
            </Button>
          )}
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

TableRow.propTypes = {
  id: PropTypes.string,
  packageName: PropTypes.string,
  guideName: PropTypes.string,
  tourDate: PropTypes.string,
  price: PropTypes.number,
  bookingCount: PropTypes.number,
  status: PropTypes.string,
  refetch: PropTypes.func,
};

export default Booking;
