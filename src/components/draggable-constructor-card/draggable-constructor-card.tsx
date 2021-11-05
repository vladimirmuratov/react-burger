import React, {FC, useRef} from "react";
import styles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {TProps} from "./draggable-constructor-card-types";
import {TItemWithIndex} from "../../types";

export const DraggableConstructorCard: FC<TProps> = ({item, index, customId, moveCard, deleteHandler}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{handlerId}, drop] = useDrop({
        accept: 'itemDrop',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: TItemWithIndex, monitor) {
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

            const hoverClientY = clientOffset && (clientOffset.y - hoverBoundingRect.top);

            if (dragIndex < hoverIndex && hoverClientY && (hoverClientY < hoverMiddleY)) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY && (hoverClientY > hoverMiddleY)) {
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