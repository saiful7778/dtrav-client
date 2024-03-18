import { Button, Spinner, Tabs } from "keep-react";
import overviewVideo from "@/assets/overview-video.mp4";
import { useQuery } from "@tanstack/react-query";
import axiosBase from "@/lib/config/axios.config";
import PackageItem from "@/components/PackageItem";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navivate = useNavigate()
  const { data: packages, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axiosBase.get("/packages", {
        params: { limit: 3 },
      });
      return data?.data;
    },
  });


  return (
    <>
      <h3 className="text-center text-3xl font-bold">
        Tourism and Travel Guide
      </h3>
      <Tabs
        className="my-10 flex flex-col items-center justify-center"
        activeLabel="overview"
      >
        <Tabs.List>
          <Tabs.Item label="overview">Overview</Tabs.Item>
          <Tabs.Item label="packages">Our Packages</Tabs.Item>
          <Tabs.Item label="tourGuide">Meet Our Tour Guides</Tabs.Item>
        </Tabs.List>
        <div>
          <Tabs.Content className="relative" label="overview">
            <video width={640} height={360} autoPlay loop>
              <source src={overviewVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 z-50 flex items-end bg-gradient-to-b from-transparent to-gray-900/80 p-2 text-gray-50">
              <div className="text-3xl font-bold">
                We are offering the best <br /> touring guide that you ever
                <br />
                experience
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content className="text-gray-800" label="packages">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <div className="flex justify-center">
                  <Spinner color="info" size="xl" />
                </div>
              ) : (
                packages?.map((ele, idx) => (
                  <PackageItem key={"pk" + idx} inputData={ele} />
                ))
              )}
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => navivate("/packages")}
                className="bg-pri hover:bg-pri/80"
                color="primary"
                size="sm"
              >
                All Packages
              </Button>
            </div>
          </Tabs.Content>
          <Tabs.Content label="tourGuide">Meet Our Tour Guides</Tabs.Content>
        </div>
      </Tabs>
    </>
  );
};

export default Home;
