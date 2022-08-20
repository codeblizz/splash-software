const PosToast = ({ appearance, children }) => (
    <div
      style={{
        background: appearance == "error" ? "#e45353" : "#B6EFD4",
        color: appearance == "error" ? "white" : "#0A210F",
        margin: 5,
        borderColor: "red",
        borderWidth: 40,
        padding: 10,
        fontSize: 16,
        fontWeight: 15,
        borderRadius: "3px",
      }}
    >
      <img
        // src={require("./Assets/icons/mere.png")}
        height="25px"
        width="25px"
        style={{ margin: 5 }}
      />
      {children}
    </div>
  );

export default PosToast;