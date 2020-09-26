// 头部组件
Vue.component('todo-header', {
  template: `
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done?" v-model="todoName" @keyup.enter="addTodo" autofocus>
  </header>
  `,
  data () {
    return {
      todoName: ''
    }
  },
  methods: {
    addTodo () {
      if(!this.todoName.trim()) return alert('输入内容不能为空!')
      this.$emit('add-todo', this.todoName)
      //输入后，清空输入框
			this.todoName = ''
    }
  }
})