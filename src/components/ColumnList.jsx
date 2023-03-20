import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appendingColumn } from "../redux/itemsObj";
import SingleItem from "./SingleItem";

import styles from "../styles/styles";

export default function ColumnList(props) {
  const [checked, setChecked] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isCompDraggable, setIsCompDraggable] = useState(true);

  const itemsObj = useSelector((state) => state.itemsObj.itemsObj);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setChecked(() => !checked);
  };

  useEffect(() => {
    setIsDraggable(checked);
    setIsCompDraggable(!checked);
  }, [checked]);

  const handleOnDragStart = (e) => {
    if (!checked) return;
    const pageNo = props.pageNo;
    props.dragItemsList.current = { pageNo };
    props.prevCheckedColumnList.current = { setChecked };
    console.log("columnStart", props.dragItemsList.current);
  };
  const handleOnDragEnter = (e) => {
    if (!props.dragItemsList.current) return;
    const pageNo = props.pageNo;
    props.dragOverItemsList.current = { pageNo };
    console.log("columnEnter", props.dragOverItemsList.current);
  };
  const drop = (e) => {
    if (!props.dragItemsList.current) return;
    if (
      props.dragItemsList.current.pageNo ===
      props.dragOverItemsList.current.pageNo
    ) {
      return;
    }
    const startColumnCopyList = [
      ...itemsObj[props.dragItemsList.current.pageNo],
    ];
    const dropColumnCopyList = [
      ...itemsObj[props.dragOverItemsList.current.pageNo],
    ];
    if (dropColumnCopyList[0].title === "Add More") {
      dropColumnCopyList.splice(0, 1);
    }
    const newdropColumnCopyList = [
      ...dropColumnCopyList,
      ...startColumnCopyList,
    ];
    const startColumnPageNo = props.dragItemsList.current.pageNo;
    const dropColumnPageNo = props.dragOverItemsList.current.pageNo;
    props.dragItemsList.current = null;
    props.dragOverItemsList.current = null;
    props.prevCheckedColumnList.current.setChecked(false);
    props.prevCheckedColumnList.current = null;
    dispatch(
      appendingColumn({
        startColumnPageNo,
        dropColumnPageNo,
        newdropColumnCopyList,
      })
    );
  };

  return (
    <div style={styles.ColumnListDiv1}>
      ColumnList
      {" " + props.pageNo}
      <div
        draggable={isDraggable}
        onDragStart={(e) => handleOnDragStart(e)}
        onDragEnter={(e) => handleOnDragEnter(e)}
        onDragEnd={(e) => drop(e)}
      >
        <div style={styles.ColumnListDiv2}>
          <div>Move All</div>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {itemsObj[props.pageNo].map((item, ind) => {
          return (
            <SingleItem
              key={ind}
              ind={ind}
              pageNo={props.pageNo}
              dragItem={props.dragItem}
              dragOverItem={props.dragOverItem}
              dragItemsList={props.dragItemsList}
              dragOverItemsList={props.dragOverItemsList}
              checked={checked}
              setChecked={setChecked}
              isCompDraggable={isCompDraggable}
            />
          );
        })}
      </div>
    </div>
  );
}
