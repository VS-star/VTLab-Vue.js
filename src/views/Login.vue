<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
        <div v-show="submitted && !username" class="alert alert-warning">Username is required</div>
      </div>
      <div class="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
        <div v-show="submitted && !password" class="alert alert-warning">Password is required</div>
        <div v-if="validationError" class="alert alert-warning">{{validationError}}</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loggingIn || validationError">Login</button>
        <img v-show="loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      submitted: false,
    }
  },
  computed: {
    loggingIn () {
      return this.$store.state.authentication.status.loggingIn;
    },
    validationError () {
      return this.validatePassword(this.password);
    }
  },
  methods: {
    handleSubmit (e) {
      this.submitted = true;
      const { username, password } = this;
      if (this.validationError) return;
      const { dispatch } = this.$store;
      if (username && password) {
        dispatch('authentication/login', { username, password });
      }
    },
    validatePassword(password) {
      // alphabet
      for (var i =0; i< password.length - 2; i++) {
        if (password.charCodeAt(i) < 97 || password.charCodeAt(i) > 122) {
          return "Password contains non small alphabet letter.";
        }
      }

      // abc to xyz
      var firstReq = false;
      for (i =0; i< password.length - 2; i++) {
        firstReq = password.charCodeAt(i) > 96 && password.charCodeAt(i) < 121;
        firstReq &&= password.charCodeAt(i) === (password.charCodeAt(i + 1) - 1);
        firstReq &&= password.charCodeAt(i) === (password.charCodeAt(i + 2) - 2);
        if (firstReq) break;
      }
      if (!firstReq) 
      {
        return "Password does not contain increasing straight like 'abc'.";
      }

      //i O l
      for (i =0; i< password.length; i++) {
        if (['i', 'O', 'l'].indexOf(password.charAt(i)) > -1) {
          return "Password contains '" + password.charAt(i) + "'.";
        }
      }

      //non-overlapping pairs
      for (i =0; i< password.length - 1; i++) {
        if (password.charCodeAt(i) === (password.charCodeAt(i + 1))) {
          return "Password contains overlapping pairs";
        }
      }

      //32 chars
      if (password.length > 32) {
        return "Password longer than 32 characters.";
      }
      return null;
    }
  }
};
</script>