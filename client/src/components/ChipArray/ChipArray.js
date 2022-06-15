import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 2, label: "Assessment" },
    { key: 3, label: "Mid Term" },
    { key: 4, label: "React" },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <div className={classes.root}>
      {chipData.map((data) => {
        return (
          <Chip
            style={{
              fontSize: "11px",
              color: "grey",
              background: props.background || "",
            }}
            key={data.key}
            size="small"
            label={data.label}
            // onDelete={data.label === "React" ? undefined : handleDelete(data)}
          />
        );
      })}
    </div>
  );
}
