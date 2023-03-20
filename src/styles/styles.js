const styles = {
    ColumnListDiv1: {
        backgroundColor: "lightyellow",
        textAlign: "center",
        borderStyle: "solid",
        borderWidth: "1",
        borderColor: "black",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      },
      ColumnListDiv2: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 10,
        paddingLeft: 10,
      },
      MainDiv1: {
        backgroundColor: "aqua",
        fontSize: "20px",
        textAlign: "center",
        paddingTop: 5,
      },
      MainDiv2: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-around",
      },
      SingleItemDiv1: {
        margin: 2,
        backgroundColor: "lightblue",
        padding: 10,
        flex: 1,
        display: "flex",
        flexDirection: "row",
      },
      SingleItemImg1: { 
        height: 50, 
        width: 50, 
        borderRadius: 25, 
        margin: 10 
      },
      SingleItemDiv2: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        marginLeft: 10,
      },
}

export default styles;