const SelectButton = ({ children, selected, onClick }) => {
    return (
      <span
        onClick={onClick}
        style={{
          backgroundColor: selected ? "gold" : "",
          color: selected ? "black" : "",
          fontWeight: selected ? 700 : 500,
  
          display: "flex",
          justifyContent: "center",
          border: "1px solid gold",
          borderRadius: 5,
          padding: 10,
  
          fontFamily: "Montserrat",
          cursor: "pointer",
  
          "&:hover": {
            backgroundColor: "gold",
            color: "black",
          },
          width: "22%",
        }}
      >
        {children}
      </span>
    );
  };
  
  export default SelectButton;