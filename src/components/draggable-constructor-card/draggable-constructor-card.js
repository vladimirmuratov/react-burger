import React, {useRef} from "react";
import styles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from 'prop-types';

export const DraggableConstructorCard = ({item, index, customId, moveCard, deleteHandler}) => {
    const ref = useRef(null);

    const [{handlerId}, drop] = useDrop({
        accept: 'itemDrop',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;

            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [, drag] = useDrag({
        type: 'itemDrop',
        item: () => {
            return {customId, index};
        }
    })
    drag(drop(ref));
    return (
        <div
            className={styles.wrapper}
            ref={ref}
        >
            <DragIcon type={"primary"}/>
            <ConstructorElement text={item.name} thumbnail={item.image} price={item.price}
                                handleClose={() => deleteHandler(item.customId)}/>
        </div>
    )
}

DraggableConstructorCard.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    customId: PropTypes.number,
    moveCard: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired
};