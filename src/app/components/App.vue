<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"> MEVN Stack </a>
      </div>
    </nav>
    <div class="container">
      <div class="pt-5 row">
        <div class="mb-3 col-md-5 col-lg-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input
                    v-model="task.title"
                    type="text"
                    placeholder="Insert a task"
                    class="form-control"
                  />
                </div>
                <div class="mt-2 form-group">
                  <textarea
                    v-model="task.description"
                    cols="30"
                    rows="10"
                    class="form-control"
                    placeholder="Insert a description"
                  ></textarea>
                </div>
                <template>
                  <button class="mt-2 btn btn-success btn-block" v-if="!isEdit">
                    Save
                  </button>
                  <template v-else>
                    <button class="mt-2 btn btn-success btn-block">
                      Update
                    </button>
                    <button
                      @click="cancelEdit"
                      class="mt-2 btn btn-danger btn-block"
                    >
                      Cancel
                    </button>
                  </template>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7 col-lg-7">
          <h3>Task List</h3>
          <template v-if="tasks.length">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Task</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(task, index) in tasks" :key="task.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ task.title }}</td>
                  <td>{{ task.description }}</td>
                  <td>
                    <button
                      @click="editTask(task._id)"
                      class="btn btn-sm text-primary"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      @click="deleteTask(task._id)"
                      class="btn btn-sm text-danger"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
          <template v-else>
            <p class="text-center text-muted">Nothing to show</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Task {
  constructor(_id = null, title = null, description = null) {
    this._id = _id;
    this.title = title;
    this.description = description;
  }
}

export default {
  data() {
    return {
      task: new Task(),
      tasks: [],
      isEdit: false,
    };
  },
  methods: {
    getTasks() {
      fetch("/api/tasks/")
        .then((response) => response.json())
        .then((data) => {
          this.tasks = data;
        })
        .catch((err) => {
          this.showErrors(err);
        });
    },
    addTask() {
      fetch("/api/tasks/", {
        method: "POST",
        body: JSON.stringify(this.task),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.reactToActionInCrud(data.status);
          this.resetForm();
        })
        .catch((err) => {
          this.showErrors(err);
        });
    },
    editTask(taskID) {
      fetch(`/api/tasks/${taskID}`)
        .then((response) => response.json())
        .then(({ _id, title, description }) => {
          this.isEdit = true;
          this.task = new Task(_id, title, description);
        })
        .catch((err) => {
          this.showErrors(err);
        });
    },
    updateTask() {
      const { _id, title, description } = this.task;
      fetch(`/api/tasks/${_id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          description,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.reactToActionInCrud(data.status);
          this.isEdit = false;
          this.resetForm();
        })
        .catch((err) => {
          this.showErrors(err);
        });
    },
    sendTask() {
      if (!this.isEdit) {
        this.addTask();
      } else {
        this.updateTask();
      }
    },
    deleteTask(taskID) {
      fetch(`/api/tasks/${taskID}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.reactToActionInCrud(data.status);
        })
        .catch((err) => {
          this.showErrors(err);
        });
    },
    cancelEdit() {
      this.isEdit = false;
      this.resetForm();
    },
    resetForm() {
      this.task = new Task();
    },
    reactToActionInCrud(message) {
      this.$toasted.success(message, {
        duration: 1500,
      });
      this.getTasks();
    },
    showErrors(err) {
      this.$toasted.error(err, {
        duration: 1500,
      });
    },
  },
  created() {
    this.getTasks();
  },
};
</script>

<style></style>
