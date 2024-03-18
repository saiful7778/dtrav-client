import PackageItem from "@/components/PackageItem";
import axiosBase from "@/lib/config/axios.config";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "keep-react";

const Packages = () => {
  const {
    data: packages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axiosBase.get("/packages");
      return data?.data;
    },
  });
  return (
    <>
      <h3 className="my-8 text-center text-3xl font-bold">
        Tourism and Travel Guide
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

export default Packages;
