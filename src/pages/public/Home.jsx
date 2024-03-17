import { Tabs } from "keep-react";
import overviewVideo from "@/assets/overview-video.mp4";

const Home = () => {
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
          <Tabs.Content label="packages">Packages</Tabs.Content>
          <Tabs.Content label="tourGuide">Meet Our Tour Guides</Tabs.Content>
        </div>
      </Tabs>
    </>
  );
};

export default Home;
