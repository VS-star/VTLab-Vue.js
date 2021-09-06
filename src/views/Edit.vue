<template>
  <div>
    <h2>Edit</h2>
    <form v-if="delivery" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="when">When</label>
        <input type="text" v-model="delivery.when" name="when" class="form-control" />
      </div>
      <h4>Origin Information</h4>
      <div class="form-group">
        <label for="origin_street">Street</label>
        <input type="text" v-model="delivery.origin.street" name="origin_street" class="form-control" />
      </div>
      <div class="form-group">
        <label for="origin_number">Number</label>
        <input type="text" v-model="delivery.origin.number" name="origin_number" class="form-control" />
      </div>
      <div class="form-group">
        <label for="origin_city">City</label>
        <input type="text" v-model="delivery.origin.city" name="origin_city" class="form-control" />
      </div>
      <div class="form-group">
        <label for="origin_postal_code">Postal Code</label>
        <input type="text" v-model="delivery.origin.postalCode" name="origin_postal_code" class="form-control" />
      </div>
      <h4>Destination Information</h4>
      <div class="form-group">
        <label for="destination_street">Street</label>
        <input type="text" v-model="delivery.destination.street" name="destination_street" class="form-control" />
      </div>
      <div class="form-group">
        <label for="destination_number">Number</label>
        <input type="text" v-model="delivery.destination.number" name="destination_number" class="form-control" />
      </div>
      <div class="form-group">
        <label for="destination_city">City</label>
        <input type="text" v-model="delivery.destination.city" name="destination_city" class="form-control" />
      </div>
      <div class="form-group">
        <label for="destination_postal_code">Postal Code</label>
        <input type="text" v-model="delivery.destination.postalCode" name="destination_postal_code" class="form-control" />
      </div>
      <div class="form-group">
        <h4>Products</h4>
        <div v-for="(product, index) in delivery.products" :key="index" class="row" style="margin-bottom: 10px">
          <div class="col-sm-10">
            <input  type="text" v-model="delivery.products[index]" placeholder="Input Product ID" class="form-control" />
          </div>
          <div class="col-sm-2 text-right">
            <button class="btn btn-danger" @click.prevent="(e)=>removeProduct(index)">Remove</button>
          </div>
        </div>
        <button class="btn btn-success" @click.prevent="addProduct">Add New Product</button>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" @click.prevent="handleUpdate" :disabled="loading">Update</button>
      </div>
    </form>
    <h4 v-else-if="!loading">We couldn't find any delivery matching current ID.</h4>
    <img v-show="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
  </div>
</template>

<script>
import { dataService } from '../services';
import router from '../router';

export default {
  props: ["id"],
  data () {
    return {
      loading: false,
      submitted: false,
      delivery: null,
    }
  },
  created() {
    this.getDelivery(this.id);
  },
  methods: {
    getDelivery (id) {
      this.loading = true;
      dataService.getDelivery(id)
      .then(response => {
        this.delivery = response.data;
        this.delivery.__v = undefined;
      })
      .catch((err) => {
        console.log(err);
        this.delivery = null;
      }).then(() => {
        this.loading = false;
      });
    },
    removeProduct (id) {
      if (id >= this.delivery.products.length) return;
      this.delivery.products.splice(id, 1);
    },
    addProduct (e) {
      this.delivery.products.push("");
    },
    handleUpdate(e) {
      this.loading = true;
      dataService.editDelivery(this.delivery)
      .then(response => {
        router.push('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        this.loading = false;
      });
    }
  }
};
</script>