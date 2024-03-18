import bannerBg1 from "@/assets/img/banner-bg-01.jpg";
import bannerBg2 from "@/assets/img/banner-bg-02.jpg";
import bannerBg3 from "@/assets/img/banner-bg-03.jpg";

export const navLinks = [
  { _id: "nv1", navName: "home", path: "/" },
  { _id: "nv2", navName: "community", path: "/community" },
  { _id: "nv3", navName: "blogs", path: "/blogs" },
  { _id: "nv4", navName: "about us", path: "/about" },
  { _id: "nv5", navName: "contact us", path: "/contact" },
];

export const heroText = [
  {
    _id: "ht1",
    text1: "1 Days in Switzerland",
    text2: "Special",
    des: "Bern, Lucern, Zurich, Zermatt, Metahorn, Jungfrau",
    image: bannerBg1,
    btnLink: "/",
  },
  {
    _id: "ht2",
    text1: "Find your perfect",
    text2: "vacation",
    des: "Italy, Rome, Venice, Milan",
    image: bannerBg2,
    btnLink: "/",
  },
  {
    _id: "ht3",
    text1: "open your eyes to",
    text2: "The hidden world",
    des: "Italy, Rome, Venice, Milan",
    image: bannerBg3,
    btnLink: "/",
  },
];

export const adminNavlinks = [
  { navName: "My Bookings", path: "/admin/bookings", accessRole: "user" },
  { navName: "My Wishlist", path: "/admin/wishlist", accessRole: "user" },
  {
    navName: "My Assigned Tours",
    path: "/admin/assign_tours",
    accessRole: "guide",
  },
  {
    navName: "Add Package",
    path: "/admin/add_package",
    accessRole: "admin",
  },
  {
    navName: "Manage Users",
    path: "/admin/manage_users",
    accessRole: "admin",
  },
];
