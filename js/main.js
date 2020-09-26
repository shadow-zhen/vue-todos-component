// 主体组件
Vue.component('todo-main', {
  template: `
    <section class="main">
      <input id="toggle-all" class="toggle-all" @change="changeAllstate" :checked="ischecked" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li :class="{ completed: item.state, editing: item.id === now }" v-for="item in todos" :key="item.id">
          <div class="view">
            <input class="toggle" type="checkbox" :checked="item.state" @change="changeState(item.id, $event)">
            <label @dblclick="showEdit(item.id)">{{ item.name }}</label>
            <button class="destroy" @click="delTodo(item.id)"></button>
          </div>
          <input class="edit" :value="item.name" @keyup.enter="editTodo(item.id, $event)">
        </li>
      </ul>
    </section>
  `,
  data () {
    return {
      now: -1
    }
  },
  props: ['todos'],
  methods: {
    delTodo (id) {
      this.$emit('del-todo', id)
    },
    showEdit (id) {
      this.now = id 
    },
    editTodo (id, e) {
      this.$emit('edit-todo', id, e.target.value)
      this.now = -1
    },
    changeState (id, e) {
      this.$emit('change-state', id, e.target.checked)
    },
    changeAllstate (e) {
      this.$emit('change-all-state', e.target.checked)
    }
  },
  computed: {
    ischecked () {
      return this.todos.every(item => item.state)
    }
  }
})