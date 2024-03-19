import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Spinner, Table } from "keep-react";
import moment from "moment";
import PropTypes from "prop-types";

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
  return (
    <Table
      className="z-[-1] overflow-auto"
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
            packageName={ele.package.title}
            guideName={ele.guide.fullName}
            tourDate={ele.tourData}
            price={ele.price}
            status={ele.status}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

const TableRow = ({ packageName, guideName, tourDate, price, status }) => {
  const date = moment(tourDate).format("Do MMM YY, h:mm a");

  return (
    <Table.Row>
      <Table.Cell>{packageName}</Table.Cell>
      <Table.Cell>{guideName}</Table.Cell>
      <Table.Cell>{date}</Table.Cell>
      <Table.Cell>${price}</Table.Cell>
      <Table.Cell>{status}</Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-2">
          <Button color="primary" variant="outline" size="xs">
            Pay
          </Button>
          <Button color="error" size="xs">
            Cancel
          </Button>
          <Button color="primary" size="xs">
            Apply
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

TableRow.propTypes = {
  packageName: PropTypes.string,
  guideName: PropTypes.string,
  tourDate: PropTypes.string,
  price: PropTypes.number,
  status: PropTypes.string,
};

export default Booking;
