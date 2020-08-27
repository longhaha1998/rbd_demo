import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import './task.less';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${(props) => (
        props.isDragDisabled
            ? 'lightgrey'
            : props.isDragging
                ? 'lightgreen'
                : 'white'
    )};
`;

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.getStyle = this.getStyle.bind(this);
    }

    getStyle(style) { 
        const transform = style.transform
        if (!!transform) {
          return {
            ...style,
            transform: `translate(0px${transform.slice(transform.indexOf(","),transform.length)}`
          };
        }
        return style;
    }

    render() {
        // const isDragDisabled = this.props.task.id === 'task-1';
        return (
            <Draggable
                draggableId = {this.props.task.id}
                index = {this.props.index}
                // isDragDisabled = {isDragDisabled}
            >
                {/* 
                    // Draggable
                    snapshot: {
                        isDragging: boolean,
                        draggingOver: 'column-1'
                    }
                */}
                {(provided, snapshot) => (
                    <Container
                        ref = {provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging = {snapshot.isDragging}
                        // isDragDisabled = {isDragDisabled}
                        style={this.getStyle(
                            provided.draggableProps.style
                        )}
                    >
                         {this.props.task.content}
                    </Container>
                )}
            </Draggable>
        )
    }
}

export default Task;