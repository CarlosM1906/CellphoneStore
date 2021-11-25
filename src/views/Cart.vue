<template>
  <div>
    <!-- NAVBAR -->
    <navbar
      @show="showModal"
      v-bind:carrito="$route.params.carrito"
      @buscar='buscar'
      class="fixed-top"
      id="top"
      ref="top"
    ></navbar>
    <!-- NAVBAR -->
    <br /><br /><br />
    <!-- <h1>{{$route.params.carrito}}</h1>     -->
    <!-- MODAL -->
    <nuevo-anuncio
      v-if="modal === true"
      @hide="hideModal"
      @toast="showToast"
      v-bind:modal="modal"
      v-bind:idAnuncio="anuncios.length > 0 ? siguienteAnuncio : 1"
    ></nuevo-anuncio>
    <!-- MODAL -->

    <!-- CARDS -->
    <div class="container-fluid mx-auto">
      <div class="ml-3 ml-md-5 mt-2 mb-3" style="text-align: left">
        <span class="h3" style="text-align: left"
          ><strong>Articulos en el Carrito</strong></span
        >
      </div>
      <b-card
        class="overflow-hidden box-shadow my-2"
        style="max-width: 99%"
        v-for="(anuncio, id) in $route.params.carrito"
        :key="id"
      >
        <div class="row my-0 py-0">
          <div class="col col-6 col-md-2 my-auto py-0">
            <router-link
              :to="{
                name: 'Detalles',
                params: {
                  anuncio: anuncio.producto.idAnuncio,
                  carrito: carrito,
                },
              }"
            >
              <b-card-img
                :src="anuncio.producto.imagen"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
            </router-link>
          </div>

          <div
            class="col col-md-6 col-6 card-body pt-0 mr-auto"
            style="text-align: left"
          >
            <div class="row">
              <router-link
                :to="{
                  name: 'Detalles',
                  params: {
                    anuncio: anuncio.producto.idAnuncio,
                    carrito: carrito,
                  },
                }"
                style="color: black"
              >
                <h2 class="card-title h4 mb-1">
                  {{ anuncio.producto.titulo }}
                </h2>
              </router-link>
            </div>

            <div class="row">
              <small class="text-muted my-auto">Vendedor: &nbsp;</small>
              <span class="badge badge-pill badge-secondary my-auto"
                ><b-icon-person class="mb-0" />
                {{ anuncio.producto.vendedor }}</span
              >
              &nbsp;
              <small class="text-muted my-auto"
                >Tel: {{ anuncio.producto.telefono }}</small
              >
            </div>
            <div class="row">
              <p class="card-text">
                <small class="text-muted"
                  >Estado: {{ anuncio.producto.estado }}</small
                >
              </p>
            </div>
            <div class="row">
              <h3 class="card-text h5">${{ anuncio.producto.precio }}</h3>
            </div>
          </div>

          <div class="col col-md-2 col-6">
            <div class="row mt-md-1">
              <span class="mx-auto my-auto mt-0 mb-0 h3">
                <strong>Cantidad</strong>
              </span>
            </div>
            <div class="row mt-md-5 my-auto">
              <div class="mx-auto">
                <b-button
                  size="lg"
                  class="d-inline"
                  variant="danger"
                  @click="menos(id)"
                  v-if="anuncio.cantidad == 1"
                >
                  <font-awesome-icon :icon="['fas', 'trash']" />
                </b-button>

                <b-button
                  size="lg"
                  class="d-inline"
                  style="background-color: black"
                  @click="menos(id)"
                  v-if="anuncio.cantidad > 1"
                  ><font-awesome-icon :icon="['fas', 'minus']" />
                </b-button>
                <div class="d-inline col-1">
                  {{ anuncio.cantidad }}
                </div>
                <b-button
                  size="lg"
                  class="d-inline"
                  style="background-color: black"
                  @click="mas(id)"
                  ><font-awesome-icon :icon="['fas', 'plus']"
                /></b-button>
              </div>
            </div>
          </div>

          <div class="col col-md-2 col-6">
            <div class="row mt-md-1">
              <span class="mx-auto my-auto mt-0 mb-0 h3">
                <strong>Subtotal</strong>
              </span>
            </div>
            <div class="row mt-md-5 my-auto">
              <div class="mx-auto">
                <div class="d-inline col-1">
                  <span class="h1">
                    <strong>${{ anuncio.subtotal }}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-card>

      <b-card class="overflow-hidden box-shadow my-2" style="max-width: 99%">
        <div class="row">
          <div
            class="text h4 text-uppercase col-12 col-md-6 my-auto"
            style="text-align: left"
          >
            <strong>Total a pagar: ${{ total }}</strong>
          </div>

          <div
            class="text-center col-12 col-md-6 my-auto"
            style="text-align: center"
          >
            <div class="d-md-inline mb-3 mb-xl-auto mt-3 mt-xl-auto mr-xl-3">
              <router-link
                :to="{
                  name: 'Home',
                  params: { carrito: $route.params.carrito },
                }"
              >
                <button class="btn btn-outline-dark my-auto">
                  <span class="">CONTINUAR COMPRANDO &nbsp;</span>
                  <font-awesome-icon
                    class="my-auto"
                    :icon="['fas', 'cart-plus']"
                  />
                </button>
              </router-link>
            </div>

            <div class="d-md-inline">
              <button class="btn btn-outline-cancel px-4 px-xl-auto">
                FINALIZAR LA COMPRA &nbsp;
                <b-icon-credit-card-fill class="my-auto" />
              </button>
            </div>
          </div>
        </div>
      </b-card>
    </div>
    <!-- CARDS -->
  </div>
</template>

<script>
import { db } from "../db";
import Navbar from "../components/Navbar.vue";
import NuevoAnuncio from "../components/NuevoAnuncio.vue";
// import Pie from "../components/Pie.vue";
export default {
  name: "Cart",
  components: {
    Navbar,
    NuevoAnuncio,
    // Pie,
  },
  data() {
    return {
      modal: false,
      carrito: [],
    };
  },

  firestore: {
    anuncios: db.collection("anuncios"),
  },

  mounted() {
    if (this.$route.params.carrito != undefined) {
      this.carrito = this.$route.params.carrito;
    }
  },

  computed: {
    total() {
      let totalPago = 0.0;
      for (let index = 0; index < this.carrito.length; index++) {
        totalPago = totalPago + this.carrito[index].subtotal;
      }
      return totalPago;
    },
  },

  methods: {
    buscar(cadena) {
      this.$router.push({
        name: "Home",
        params: { carrito: this.$route.params.carrito, cadena: cadena },
      });
    },

    menos(id) {
      if (this.$route.params.carrito[id].cantidad == 1) {
        this.$route.params.carrito.splice(id, 1);
      } else {
        this.$route.params.carrito[id].cantidad =
          this.$route.params.carrito[id].cantidad - 1;
        this.$route.params.carrito[id].subtotal =
          this.$route.params.carrito[id].cantidad *
          this.$route.params.carrito[id].producto.precio;
      }
    },

    mas(id) {
      this.$route.params.carrito[id].cantidad =
        this.$route.params.carrito[id].cantidad + 1;
      this.$route.params.carrito[id].subtotal =
        this.$route.params.carrito[id].cantidad *
        this.$route.params.carrito[id].producto.precio;
    },
    getNextId() {
      this.siguienteAnuncio = 0;
      for (let index = 0; index < this.anuncios.length; index++) {
        if (this.anuncios[index].idAnuncio > this.siguienteAnuncio) {
          this.siguienteAnuncio = this.anuncios[index].idAnuncio;
        }
      }
      this.siguienteAnuncio = this.siguienteAnuncio + 1;
      console.log(this.siguienteAnuncio);
    },

    showModal(modal) {
      this.getNextId();
      this.modal = modal;
    },

    hideModal(modal) {
      this.modal = modal;
    },

    showToast(variant) {
      let title = "";
      let content = "";
      if (variant) {
        if (variant === "info") {
          title = "Carrito";
          content = "Producto añadido al carrito.";
        } else {
          title = "Nuevo Anuncio";
          content = "Anuncio creado correctamente";
        }
        this.$bvToast.toast(content, {
          title: title,
          variant: variant,
          solid: true,
        });
      }
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

.btn-outline-dark {
  color: black !important;
  border-color: black !important;
}

.btn-outline-dark:hover {
  color: #fff !important;
  background-color: black !important;
  border-color: black !important;
}

.btn-outline-dark:focus,
.btn-outline-dark.focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.5) !important;
}

.box-shadow {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
