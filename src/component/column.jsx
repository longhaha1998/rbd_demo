import React from 'react';
import styled from 'styled-components';
import { Droppable } from "react-beautiful-dnd";
import Task from './task';


const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;
    display: flex;
    flex-direction: column;
s`;

const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;
`;

class InnerList extends React.Component {

    shouldComponentUpdate(nextProps) {
        if(nextProps.tasks === this.props.tasks) {
            return false;
        }
        return true;
    }

    render() {
        return this.props.tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index}></Task>
        ));
    }
}

class Column extends React.Component {
    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable 
                    droppableId = {this.props.column.id}
                    // type 相同type才能drop
                    // isDropDisabled = {this.props.isDropDisabled}
                >
                    {/* 
                        // Droppable
                        snapshot: {
                            isDraggingOver: boolean,
                            draggingOverWith: 'task-1'
                        }
                    */}
                    {(provided, snapshot) => (
                        <TaskList
                            {...provided.droppableProps}
                            ref = {provided.innerRef}
                            isDraggingOver = {snapshot.isDraggingOver}
                        >
                            <InnerList tasks={this.props.tasks}/>
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        )
    }
}

export default Column;