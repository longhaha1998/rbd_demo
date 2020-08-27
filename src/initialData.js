const initialData = {
    tasks: {
        'task-1': {
            id: 'task-1',
            content: 'task-1'
        },

        'task-2': {
            id: 'task-2',
            content: 'task-2'
        },

        'task-3': {
            id: 'task-3',
            content: 'task-3'
        },

        'task-4': {
            id: 'task-4',
            content: 'task-4'
        },

        'task-5': {
            id: 'task-5',
            content: 'task-5'
        },

        'task-6': {
            id: 'task-6',
            content: 'task-6'
        },

        'task-7': {
            id: 'task-7',
            content: 'task-7'
        },

        'task-8': {
            id: 'task-8',
            content: 'task-8'
        },

        'task-9': {
            id: 'task-9',
            content: 'task-9'
        },

        'task-10': {
            id: 'task-10',
            content: 'task-10'
        }
    },

    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6', 'task-7', 'task-8', 'task-9', 'task-10']
        },
        // 'column-2': {
        //     id: 'column-2',
        //     title: 'In progress',
        //     taskIds: []
        // },
        // 'column-3': {
        //     id: 'column-3',
        //     title: 'Done',
        //     taskIds: []
        // },
    },

    // columnOrder: ['column-1', 'column-2', 'column-3'],
    columnOrder: ['column-1']
}

export default initialData;
