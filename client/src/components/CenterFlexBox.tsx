type PropsType = {
  children?: React.ReactNode;
};

const CenterFlexBox = ({ children }: PropsType) => {
  return <div className="center flex-1">{children}</div>;
};

export default CenterFlexBox;
