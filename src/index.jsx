import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import { DragDropContext } from "react-beautiful-dnd";
import initialData from './initialData';
import Column from './component/column';
import { sensorEmitter, useSensor } from './testSensor';
    /**
     * // start
     * {
     *  draggableId:
     *  type:
     *  reason:
     *  source: {
     *      droppableId:
     *      index: 
     *  }
     * }
     * 
     * // update
     * {
     *  ...start
     *  destination: {
     *      droppableId:
     *      index:
     *  } | null
     * }
     * 
     * // result
     * {
     *  ...update
     *  reason: 'DROP'
     * }
     */

const Container = styled.div`
    display: flex;
    width: 90vw;
`;

const SensorContext = React.createContext(null);

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...initialData
        };

        // this.onDragStart = this.onDragStart.bind(this);
        // this.onDragUpdate = this.onDragUpdate.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    // onDragStart = (start) => {
    //     console.log('DragDropContext', 'onDragStart');
    //     const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);

    //     this.setState({
    //         homeIndex,
    //     })
    // }

    // onDragUpdate = (result) => {
    //     console.log('DragDropContext', 'onDragUpdate', result);
    // }

    onDragEnd = (result) => {
        this.setState({
            homeIndex: null
        });

        const { source, destination, draggableId } = result;

        if (!destination) {
            return ;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return ;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (source.droppableId === destination.droppableId) {
            const newTasks = Array.from(start.taskIds)
            newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...start,
                taskIds: newTasks
            };
    
            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            };
    
            this.setState(newState);
            return ;
        }

        const newStartTasks = Array.from(start.taskIds);
        newStartTasks.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: newStartTasks
        }

        const newFinishTasks = Array.from(finish.taskIds);
        newFinishTasks.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: newFinishTasks
        }

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }

        this.setState(newState);
    }

    onClick = () => {
        const newColumn = {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        };
        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                ['column-1']: newColumn,
            }
        }
        console.log(newState);

        this.setState(newState);
    }

    render(){
        return (
            <React.Fragment>
                <SensorContext.Provider value={sensorEmitter}>
                    <button onClick={this.onClick}>点我</button>
                    <button onClick={() => {sensorEmitter.emit('down', 'task-2')}}>testDownSnapSensor</button>
                    <button onClick={() => {sensorEmitter.emit('up', 'task-2')}}>testUpSnapSensor</button>
                    <DragDropContext
                        // onDragStart = {this.onDragStart}
                        // onDragUpdate = {this.onDragUpdate}
                        onDragEnd = {this.onDragEnd}
                        sensors = {[useSensor]}
                    >
                        <Container>
                        {
                            this.state.columnOrder.map((columnId, index) => {
                                const column = this.state.columns[columnId];
                                const tasks = column.taskIds.map((taskId) => this.state.tasks[taskId]);

                                return <Column key={column.id} column={column} tasks={tasks} />
                            })
                        }
                        </Container>
                    </DragDropContext>
                </SensorContext.Provider>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById("app"));