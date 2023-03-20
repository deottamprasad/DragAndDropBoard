import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColumnList from "./ColumnList";
import { useGetAllItemsQuery } from "../redux/apiSlice";
import { setItemsObj } from "../redux/itemsObj";
import styles from "../styles/styles";

export default function Main() {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragItemsList = useRef();
  const dragOverItemsList = useRef();
  const prevCheckedColumnList = useRef();
  const itemsObj = useSelector((state) => state.itemsObj?.itemsObj);
  const dispatch = useDispatch();
  const objKeysArr = itemsObj && Object.keys(itemsObj);
  const { data: myData } = useGetAllItemsQuery();

  useEffect(() => {
    dispatch(setItemsObj(myData));
  }, [myData]);

  return (
    <>
      <div style={styles.MainDiv1}>
        <h1>Drag and Drop Board</h1>
        <div style={styles.MainDiv2}>
          {objKeysArr &&
            objKeysArr.map((pageNo, index) => {
              return (
                <ColumnList
                  key={index}
                  pageNo={pageNo}
                  dragItem={dragItem}
                  dragOverItem={dragOverItem}
                  dragItemsList={dragItemsList}
                  dragOverItemsList={dragOverItemsList}
                  prevCheckedColumnList={prevCheckedColumnList}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
