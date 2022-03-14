const Main = {

  tasks: [],

  init: function () {
    this.cacheSelector()
    this.bindEvents()
    this.getStorage()
    this.buildTasks()
  },

  cacheSelector: function () {
    this.$checkButtons = document.querySelectorAll('.check')
    this.$inputTask = document.querySelector('#inputTask')
    this.$list = document.querySelector('.list')
    this.$removeButton = document.querySelectorAll('.remove')
  },

  bindEvents: function () {
    const self = this

    this.$checkButtons.forEach(button => {
      button.addEventListener('click', self.events.checkButton_click)
    })

    this.$inputTask.addEventListener('keypress', self.events.inputTask_keypress.bind(this))

    this.$removeButton.forEach(button => {
      button.addEventListener('click', self.events.removeButton_click.bind(self))
    })
  },

  getStorage: function () {
    const tasks = localStorage.getItem('tasks')
    this.tasks = JSON.parse(tasks)
  },

  buildTasks: function () {

    let html = ''

    this.tasks.forEach(item => {
      html += `
        <li>
          <div class="check"></div>
          <label>
            ${item.task}
          </label>
          <button class="remove" data-task="${item.task}"></button>
         </li>
    `
    })

    this.$list.innerHTML = html

    this.cacheSelector()
    this.bindEvents()

  },

  events: {

    checkButton_click: function (e) {
      const li = e.target.parentElement
      const isDone = li.classList.contains('done')

      if (!isDone) {
        return li.classList.add('done')
        //return é para parar o código se entrar na condição e não executar o remove da classe done
      }

      li.classList.remove('done')
    },

    inputTask_keypress: function (e) {
      const key = e.key
      const value = e.target.value

      if (key === 'Enter') {

        if (value != '') {
          this.$list.innerHTML += `
          <li>
            <div class="check"></div>
            <label>
              ${value}
            </label>
            <button class="remove" data-task="${value}"></button>
          </li>
        `
          e.target.value = ''

          this.cacheSelector()
          this.bindEvents()

          const savedTasks = localStorage.getItem('tasks')
          const savedTasksObj = JSON.parse(savedTasks)


          const obj = [
            {
              task: value
            },
            ...savedTasksObj
          ]

          localStorage.setItem('tasks', JSON.stringify(obj))
          console.log(obj)

        }
      }
    },

    removeButton_click: function (e) {
      const li = e.target.parentElement
      const value = e.target.dataset['task']

      const newTasksState = this.tasks.filter(item => item.task !== value)

      localStorage.setItem('tasks', JSON.stringify(newTasksState))

      li.classList.add('removed')

      setTimeout(() => {
        li.classList.add('hidden')
      }, 300)
    },

  }

}


Main.init()