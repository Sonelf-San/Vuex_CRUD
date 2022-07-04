import axios from 'axios'


const state = {
    todos: []
};

// Getting the state
const getters = {
    // allTodos: (state) => {
    //     return state.todos
    // }

    allTodos: state => state.todos,

    };
    
const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('http://jsonplaceholder.typicode.com/todos');
        // console.log(response.data);

        commit('setTodos', response.data);
    },

    async addTodo({ commit }, title) {
        const response = await axios.post('http://jsonplaceholder.typicode.com/todos', { title, completed: false });

        commit('newTodo', response.data);
    },

    async deleteTodo({ commit }, id) {
        await axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`);

        commit('removeTodo', id);
    },

    async updateTodo({ commit }, updTodo) {
        const response = await axios.put(`http://jsonplaceholder.typicode.com/todos/${updTodo.id}`);

        commit('updTodo', updTodo);
    },

    async filterTodos({ commit }, e) {
        // console.log(e)
        // Get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        // console.log(limit)
        const response = await axios.get(`http://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

        commit('setTodos', response.data);
    }
}

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    updateTodo: (state, updTodo) => {
        const index = state.todos.findInedex(todo => todo.id === updTodo.id);
        if(index !== -1){
            state.todos.splice(index, 1, updTodo);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}