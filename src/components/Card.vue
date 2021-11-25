<template>
  <div>
    <b-card class="overflow-hidden box-shadow" style="max-width: 99%">
      <b-row no-gutters>
        <b-col md="9" class="order-2 order-md-1" style="text-align: left">
          <div class="card-body order-2">
            <router-link
              :to="{ name: 'Detalles', params: { anuncio: anuncio.idAnuncio, carrito: carrito } }"
              style="color: black"
            >
              <h2 class="card-title mb-1">{{ anuncio.titulo }}</h2>
            </router-link>
            <span class="badge badge-pill badge-secondary"
              ><b-icon-person class="h6 mb-0" /> {{ anuncio.vendedor }}</span
            >
            <p class="card-text mt-2">
              <small class="text-muted">Estado: {{ anuncio.estado }}</small>
            </p>
            <h3 class="card-text">
              <strong>${{ anuncio.precio }}</strong>
            </h3>
          </div>
          <br />
          <div class="d-grid gap-2">
            <button
              class="btn btn-outline-cancel btn mb-2"
              type="button"
              @click="agregar"
            >
              <font-awesome-icon :icon="['fas', 'cart-plus']" /> Agregar al
              carrito
            </button>
          </div>
        </b-col>

        <b-col md="3" class="ml-auto order-1 order-md-2 my-auto">
          <router-link
            :to="{ name: 'Detalles', params: { anuncio: anuncio.idAnuncio, carrito: carrito } }"
          >
            <b-card-img :src="url" alt="Image" class="rounded-0"></b-card-img>
          </router-link>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { storage } from "../db";
export default {
  name: "Card",
  props: ["anuncio", "carrito"],
  data() {
    return {
      url: null,
    };
  },

  mounted() {    
    let ref;
    let _this = this;
    let carpeta = storage.ref().child(this.anuncio.idAnuncio.toString());
    carpeta.listAll().then((res) => {
      ref = storage.ref(res.items[0].fullPath);
      ref.getDownloadURL().then((url) => {
        _this.url = url;
        // _this.anuncio.imagen = this.url;
      });
    });
    // console.log(this.anuncio);
  },

  methods: {
    agregar() {
      // this.$emit("toast", "info");      
      this.anuncio.imagen = this.url;
      this.$emit('addCart', this.anuncio);
    },
  },
};
</script>

<style scoped>
.btn-outline-cancel {
  color: #ff7402 !important;
  border-color: #ff7402 !important;
}

.btn-outline-cancel:hover {
  color: #fff !important;
  background-color: #ff7402 !important;
  border-color: #ff7402 !important;
}

.btn-outline-cancel:focus,
.btn-outline-cancel.focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 123, 0, 0.5) !important;
}

.box-shadow {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
