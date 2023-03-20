import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  appendingSingleItemDifferentList,
  appendingSingleItemSameList,
} from "../redux/itemsObj";
import styles from "../styles/styles";

export default function SingleItem(props) {
  const itemsObj = useSelector((state) => state.itemsObj.itemsObj);
  const dispatch = useDispatch();
  const { image, title, descDate } = itemsObj[props.pageNo][props.ind];
  const dropOnSameList = () => {
    const dragItemCurrent = props.dragItem.current;
    const dragOverItemCurrent = props.dragOverItem.current;
    const copyList = [...itemsObj[dragItemCurrent.pageNo]];
    const dragItemContent = copyList[dragItemCurrent.ind];
    copyList.splice(dragItemCurrent.ind, 1);
    copyList.splice(dragOverItemCurrent.ind, 0, dragItemContent);
    const pageNo = dragItemCurrent.pageNo;
    props.dragItem.current = null;
    props.dragOverItem.current = null;
    dispatch(appendingSingleItemSameList({ pageNo, copyList }));
  };
  const dropOnDifferentList = () => {
    const dragItemCurrent = props.dragItem.current;
    const dragOverItemCurrent = props.dragOverItem.current;
    const startCopyList = [...itemsObj[dragItemCurrent.pageNo]];
    const dropCopyList = [...itemsObj[dragOverItemCurrent.pageNo]];
    const dragItemContent = startCopyList[dragItemCurrent.ind];
    startCopyList.splice(dragItemCurrent.ind, 1);
    if (dropCopyList[0].title === "Add More") {
      dropCopyList.splice(0, 1);
    }
    dropCopyList.splice(dragOverItemCurrent.ind, 0, dragItemContent);
    const startPageNo = dragItemCurrent.pageNo;
    const dropPageNo = dragOverItemCurrent.pageNo;
    props.dragItem.current = null;
    props.dragOverItem.current = null;
    dispatch(
      appendingSingleItemDifferentList({
        startPageNo,
        dropPageNo,
        startCopyList,
        dropCopyList,
      })
    );
  };
  const handleOnDragStart = (e) => {
    props.dragItemsList.current = null;
    props.dragOverItemsList.current = null;
    if (props.checked) {
      props.dragItem.current = null;
      return;
    }
    props.dragItem.current = { pageNo: props.pageNo, ind: props.ind };
    console.log("start", props.pageNo, props.ind);
  };
  const handleOnDragEnter = (e) => {
    if (!props.dragItem.current) return;
    props.dragOverItem.current = { pageNo: props.pageNo, ind: props.ind };
    console.log("Enter", props.pageNo, props.ind);
  };
  const handleOnDragEnd = (e) => {
    if (!props.dragItem.current) return;
    if (props.dragItem.current.pageNo === props.dragOverItem.current.pageNo) {
      dropOnSameList();
    } else {
      dropOnDifferentList();
    }
  };
  return (
    <div
      key={props.ind}
      style={styles.SingleItemDiv1}
      draggable={props.isCompDraggable}
      onDragStart={(e) => handleOnDragStart(e)}
      onDragEnter={(e) => handleOnDragEnter(e)}
      onDragEnd={(e) => handleOnDragEnd(e)}
    >
      {image && <img src={image} alt="nature" style={styles.SingleItemImg1} />}
      <div style={styles.SingleItemDiv2}>
        <div>{title}</div>
        <div>{descDate}</div>
      </div>
    </div>
  );
}
