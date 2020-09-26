const router = new VueRouter({
	routes: [
		{path: '/'},
		{path: '/active'},
		{path: '/completed'}
	],
	linkExactActiveClass: 'selected'
})

new Vue({
	el: '#todoapp',
	router,
	data: {
		todos: JSON.parse(localStorage.getItem('todos')) || [],
		now: -1,
	},
	methods: {
		//添加todo
		addTodo(todoName) {
			this.todos.unshift({
				id: +new Date(),
				name: todoName,
				state: false,
			})
		},
		//删除todo
		delTodo(id) {
			this.todos = this.todos.filter((item) => item.id !== id)
		},
		//修改todo
		editTodo(id, name) {
			const todo = this.todos.find((item) => item.id === id)
			todo.name = name
		},
		//修改状态
		changeState(id, state) {
			const todo = this.todos.find((item) => item.id === id)
			todo.state = state
		},
		//修改所有的状态
		changeAllState(state) {
			this.todos.forEach((item) => (item.state = state))
		},
		//清除已完成
		clearCompleted() {
			this.todos = this.todos.filter((item) => !item.state)
		},
	},
	//深度监视
	watch: {
		todos: {
			deep: true,
			handler(newVal) {
				localStorage.setItem('todos', JSON.stringify(newVal))
			},
		},
	},
	computed: {
		todoList () {
			if(this.$route.path === '/') {
				return this.todos
			} else if(this.$route.path === '/active') {
				return this.todos.filter(item => !item.state)
			} else if(this.$route.path === '/completed') {
				return this.todos.filter(item => item.state)
			}
			
		}
	}
})
