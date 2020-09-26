// 底部组件
Vue.component('todo-footer', {
	template: `
    <footer class="footer" v-show="isShowFooter">
      <span class="todo-count"><strong>{{ leftCounts }}</strong> item left</span>
      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
        <li>
          <router-link to="/">All</router-link>
        </li>
        <li>
          <router-link to="/active">Active</router-link>
        </li>
        <li>
          <router-link to="/completed">Completed</router-link>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button class="clear-completed" v-show="isShowClear" @click="clearCompleted">Clear completed</button>
    </footer>
  `,
	props: ['todos'],
	methods: {
		clearCompleted() {
			this.$emit('clear-completed')
		},
	},
	computed: {
    isShowFooter() {
			return this.todos.length > 0
		},
		leftCounts() {
			return this.todos.filter((item) => !item.state).length
		},
		isShowClear() {
			return this.todos.some((item) => item.state)
		},
	},
})
