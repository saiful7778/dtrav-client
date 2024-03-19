import { Button, Spinner, Tabs } from "keep-react";
import overviewVideo from "@/assets/overview-video.mp4";
import { useQuery } from "@tanstack/react-query";
import axiosBase from "@/lib/config/axios.config";
import PackageItem from "@/components/PackageItem";
import { Link, useNavigate } from "react-router-dom";
import PackageTypeItem from "@/components/PackageTypeItem";
import { GiLion } from "react-icons/gi";
import { RiRidingLine } from "react-icons/ri";
import { TbSwimming } from "react-icons/tb";
import SectionTitle from "@/components/SectionTitle";

const Home = () => {
  const navivate = useNavigate();
  const { data: packages, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axiosBase.get("/packages", {
        params: { limit: 3 },
      });
      return data?.data;
    },
  });

  const { data: guide, isLoading: guideLoading } = useQuery({
    queryKey: ["guide"],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/user/guide`);
      return data.data;
    },
  });

  const types = [
    {
      name: "wildLife",
      icon: <GiLion size={80} />,
    },
    {
      name: "swimming",
      icon: <TbSwimming size={80} />,
    },
    {
      name: "riding",
      icon: <RiRidingLine size={80} />,
    },
  ];

  return (
    <>
      <SectionTitle>Tourism and Travel Guide</SectionTitle>
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
            {isLoading ? (
              <div className="flex justify-center">
                <Spinner color="info" size="xl" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {packages?.map((ele, idx) => (
                  <PackageItem key={"pk" + idx} inputData={ele} />
                ))}
              </div>
            )}
            <div className="my-4 flex justify-center">
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
          <Tabs.Content label="tourGuide">
            {guideLoading ? (
              <div className="flex justify-center">
                <Spinner color="info" size="xl" />
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                {guide?.map((ele, idx) => (
                  <Link
                    to={`/guide/${ele._id}`}
                    className="size-52 rounded-md border border-gray-500 p-4 shadow"
                    key={"guide" + idx}
                  >
                    <figure className="mx-auto size-40 overflow-hidden rounded-md">
                      <img src={ele.image} alt={ele.fullName + " image"} />
                    </figure>
                    <h6 className="text-center">{ele.fullName}</h6>
                  </Link>
                ))}
              </div>
            )}
          </Tabs.Content>
        </div>
      </Tabs>
      <SectionTitle>Type of our tours</SectionTitle>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {types.map((ele, idx) => (
          <PackageTypeItem key={"type" + idx} link={ele.name}>
            <div>{ele.icon}</div>
            <div className="group-hover:underline">{ele.name}</div>
          </PackageTypeItem>
        ))}
      </div>
    </>
  );
};

export default Home;
