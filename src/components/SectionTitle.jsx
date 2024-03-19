import PropTypes from "prop-types";

const SectionTitle = ({ children }) => {
  return <h3 className="my-8 text-center text-3xl font-bold">{children}</h3>;
};

SectionTitle.propTypes = {
  children: PropTypes.node,
};

export default SectionTitle;
