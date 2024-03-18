import PackageItem from "@/components/PackageItem";
import axiosBase from "@/lib/config/axios.config";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "keep-react";
import { useParams } from "react-router-dom";

const PackageType = () => {
  const { packageType } = useParams();
  const {
    data: packages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [packageType],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/packages/${packageType}`);
      return data.data;
    },
  });
  return (
    <>
      <h3 className="my-8 text-center text-3xl font-bold">
        Explore our {`'${packageType}'`} tour type
      </h3>
      {isLoading ? (
        <div className="flex w-full justify-center">
          <Spinner color="info" size="xl" />
        </div>
      ) : isError ? (
        <div className="text-center text-xl font-bold">
          Something went wrong!
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {packages?.map((ele, idx) => (
            <PackageItem key={"pk" + idx} inputData={ele} />
          ))}
        </div>
      )}
    </>
  );
};

export default PackageType;
