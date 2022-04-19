<template>
  <div>
    <div class="container-fluid">
      <div class="row mt-5 pt-4" id="resumen">
        <!-- CAROUSEL -->
        <div class="col col-12 col-md-4 offset-md-1 shadow">
          <b-carousel
            indicators
            controls
            :interval="4000"
            id="imgAnuncio"
            class="carousel slide"
          >
            <div
              class="carousel-item active"
              v-for="(imagen, id) in imagenes"
              :key="id"
            >
              <b-img :src="imagen" class="d-block w-100 rounded-lg" alt="..." />
            </div>
          </b-carousel>
        </div>
        <!-- CAROUSEL -->

        <!-- IFORMACION -->
        <div
          class="col col-12 col-md-6 align-self-center"
          style="text-align: left"
        >
          <div class="card mt-auto">
            <div class="card-body">
              <h1 class="h1 my-2">{{ anuncioActual.titulo }}</h1>
              <h5 class="h5 text-secondary my-2 w-80">
                {{ anuncioActual.subtitulo }}
              </h5>
              <p class="d-inline">
                <small><strong>Vendedor: </strong></small>
                <span class="badge badge-pill badge-secondary mr-3"
                  ><b-icon-person class="mb-0" />
                  {{ anuncioActual.vendedor }}</span
                >
              </p>
              <p class="d-inline">
                <small><strong>Tel: </strong></small>
                <span class="badge badge-pill badge-secondary">
                  {{ anuncioActual.telefono }}</span
                >
              </p>
              <h2 class="card-title h3 my-3">
                <strong>${{ anuncioActual.precio }}</strong>
              </h2>
              <div class="d-grid gap-2">
                <button
                  type="button"
                  class="
                    btn btn-outline-dark btn-lg btn-block
                    my-2
                    d-none d-md-block
                  "
                  @click="addCart"
                >
                  Agregar al carrito
                  <font-awesome-icon :icon="['fas', 'cart-plus']" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- IFORMACION -->
        <div class="row text-center mt-5" id="descripcion">
          <div class="col ml-5 mr-0 d-none d-md-block">
            <h1><strong>Informacion Tecnica</strong><br /></h1>
          </div>
        </div>
        <hr class="w-100 text-dark" />

        <!-- ESPECIFICACIONES -->
        <div class="col col-12 col-md-5 offset-md-1" style="text-align: left">
          <h4><strong>Especificaciones</strong></h4>
          <table class="table table-borderless">
            <tbody>
              <tr>
                <td>Estado:</td>
                <td>{{ anuncioActual.estado }}</td>
              </tr>
              <tr>
                <td>Marca:</td>
                <td>{{ anuncioActual.marca }}</td>
              </tr>
              <tr>
                <td>Modelo:</td>
                <td>{{ anuncioActual.modelo }}</td>
              </tr>
              <tr>
                <td>Sistema Operativo:</td>
                <td>{{ anuncioActual.sistema }}</td>
              </tr>
              <tr>
                <td>Pantalla:</td>
                <td>{{ anuncioActual.pantalla }}''</td>
              </tr>
              <tr>
                <td>RAM:</td>
                <td>{{ anuncioActual.ram }} GB</td>
              </tr>
              <tr>
                <td>Almacenamiento:</td>
                <td>{{ anuncioActual.rom }} GB</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- ESPECIFICACIONES -->

        <!-- DESCRIPCION -->
        <div class="col-12 col-md-5" style="text-align: left">
          <div class="card border-0">
            <div class="card-body">
              <h4 class="card-title"><strong>Descripcion</strong></h4>
              <p class="card-text" style="line-height: 29px">
                {{ anuncioActual.descripcion }}<br /><br />
              </p>
            </div>
          </div>
        </div>
        <!-- DESCRIPCION -->

        <!-- BOTONES -->
        <div class="row d-md-none fixed-bottom" id="comprarFixed">
          <div class="col text-center fixed-bottom">
            <router-link :to="{ name: 'Home', params: { carrito: carrito} }" class="btn btn-dark mr-2 mb-2 btn-lg">
              <font-awesome-icon :icon="['fas', 'home']" /> Inicio
            </router-link>
            <a
              class="btn btn-danger mb-2 btn-lg"
              style="background-color: #ff7402"
              @click="addCart"
            >
              <font-awesome-icon :icon="['fas', 'cart-plus']" /> Carrito
            </a>
          </div>
        </div>
        <!-- BOTONES -->
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../db";
export default {
  name: "Anuncio",
  props: ["imagenes", "anuncio", "carrito"],
  data() {
    return {
      anuncioActual: {},
    };
  },

  mounted() {
    this.onMount();
  },

  methods: {

onMount() {
      this.anuncioActual = {};
      db.collection("anuncios")
        .get()
        .then((res) => {
          res.docs.map((doc) => {
            if (doc.data().idAnuncio == this.anuncio) {
              this.anuncioActual = doc.data();
            }
          });
        });
    },

    addCart(){
      this.anuncioActual.imagen = this.imagenes[0]
      this.$emit('addCart', this.anuncioActual);
    },

    showToast() {
      this.$emit("showToast", "info");
    },
    
  },
};
</script>

<style scoped></style>
