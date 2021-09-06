<template>
  <div>
    <h1>Hi {{user.firstName}}!</h1>
    <p>
      <button class="btn btn-primary" @click="handleSubmit">Logout</button>
    </p>
    <div v-if="orders.totalResults">
      <div class="alert alert-info">
        <strong>{{orders.totalResults}}</strong> Orders found!.
      </div>
      <table class="table table-striped table-bordered table-responsive">
        <thead>
          <tr class="success">
            <th>No</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Products</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(delivery, index) in orders.deliveries" :key="index">
            <td>{{index + 1}}</td>
            <td>{{delivery.origin.street + ' ' + delivery.origin.number + ', ' + delivery.origin.city + ' - ' + delivery.origin.postalCode}}</td>
            <td>{{delivery.destination.street + ' ' + delivery.destination.number + ', ' + delivery.destination.city + ' - ' + delivery.destination.postalCode}}</td>
            <td>
              <div v-for="(product, index) in delivery.products" :key="index">{{product}}</div>
            </td>
            <td>
              <router-link :to="{path:`/edit/${delivery._id}`}">Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <ul class="pagination">
        <li><a href="javascript:void(0)" @click.prevent="(e) => getDeliveries(limit, 1)">&lt;&lt;</a></li>
        <li><a href="javascript:void(0)" @click.prevent="(e) => getDeliveries(limit, page > 1 ? page - 1 : 1)">&lt;</a></li>
        <li v-for="(pageNum, index) in pageNums" :key="index" :class="{ 'active': pageNum == page }">
          <a href="javascript:void(0)" @click.prevent="(e) => getDeliveries(limit, pageNum)">{{pageNum}}</a>
        </li>
        <li><a href="javascript:void(0)" @click.prevent="(e) => getDeliveries(limit, page < Math.ceil(orders.totalResults/limit) ? page + 1 : Math.ceil(orders.totalResults/limit))">&gt;</a></li>
        <li><a href="javascript:void(0)" @click.prevent="(e) => getDeliveries(limit, Math.ceil(orders.totalResults/limit))">&gt;&gt;</a></li>        
      </ul>
      <br>
      <label><input type="number" min="1" class="form-control" @change.prevent="limitChange" :value="limit">Number of Orders per Page</label>
    </div>
    <img v-show="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
  </div>
</template>

<script>
import { dataService } from '../services';

export default {
  data () {
    return {
      loading: false,
      limit: 10,
      page: 1,
      orders: { totalResults : 0 }
    }
  },
  computed: {
    user () {
      return this.$store.state.authentication.user || {};
    },
    pageNums() {
      let arr = [];
      const start = (Math.ceil(this.page / 10) - 1) * 10 + 1; 
      const end = Math.min(start + 9, Math.ceil(this.orders.totalResults/this.limit)) 
      for (var i = start; i <= end; i++) arr.push(i);
      return arr;
    }
  },
  created () {
    this.$store.dispatch('users/getAll');
    this.getDeliveries(this.limit, this.page);
  },
  methods: {
    handleSubmit (e) {
      this.$store.dispatch('authentication/logout');
    },
    getDeliveries (limit = 1, page = 1) {
      this.limit = limit;
      this.page = page;
      this.loading = true;
      dataService.getDeliveries(limit, page)
      .then(response => {
        this.orders = response.data;
      })
      .catch((err) => {
        console.log(err);
        this.orders = { totalResults : 0 };
      })
      .then(() => {
        this.loading = false;
      });
    },
    limitChange (e) {
      if (e.target.value < 1) this.limit = 1;
      else this.limit = e.target.value;
      this.getDeliveries(this.limit, 1);
    }
  }
};
</script>