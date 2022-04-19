<template>
  <div>
    <!-- NAVBAR -->
    <navbar
      @show="showModal"
      v-bind:carrito="$route.params.carrito"
      @buscar="buscar"
      class="fixed-top"
      id="top"
      ref="top"
    ></navbar>
    <!-- NAVBAR -->

    <!-- MODAL -->
    <nuevo-anuncio
      v-if="modal === true"
      @hide="hideModal"
      @toast="showToast"
      v-bind:modal="modal"
      v-bind:idAnuncio="anuncios.length > 0 ? siguienteAnuncio : 1"
    ></nuevo-anuncio>
    <!-- MODAL -->

    <!-- INFORMACION -->
    <anuncio
      v-bind:carrito="$route.params.carrito"
      v-bind:imagenes="imagenes"
      v-bind:anuncio="$route.params.anuncio"
      @showToast="showToast"
      @addCart="addCart"
      class="mt-5"
    ></anuncio>
    <!-- INFORMACION -->

    <!-- FOOTER -->
    <footer>
      <pie></pie>
    </footer>
    <!-- FOOTER -->
  </div>
</template>

<script>
import { db, storage } from "../db";
import Navbar from "../components/Navbar.vue";
import NuevoAnuncio from "../components/NuevoAnuncio.vue";
import Anuncio from "../components/Anuncio.vue";
import Pie from "../components/Pie.vue";
export default {
  name: "Detalles",
  components: {
    Navbar,
    NuevoAnuncio,
    Anuncio,
    Pie,
  },
  data() {
    return {
      idAct: null,
      anuncios: [],
      imagenes: [],
      modal: false,
      siguienteAnuncio: 0,
      carrito: [],
    };
  },

  firestore: {
    anuncios: db.collection("anuncios"),
  },

  mounted() {
    this.getImages();
    // console.log(this.$route.params.carrito);
    this.carrito = this.$route.params.carrito;
  },

  methods: {
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

    getImages() {
      let ref;
      let _this = this;
      let carpeta = storage.ref().child(this.$route.params.anuncio.toString());
      carpeta.listAll().then((res) => {
        for (let index = 0; index < res.items.length; index++) {
          ref = storage.ref(res.items[index].fullPath);
          ref.getDownloadURL().then((url) => {
            _this.imagenes.push(url);
          });
        }
      });
    },

    buscar(cadena) {
      this.$router.push({
        name: "Home",
        params: { carrito: this.$route.params.carrito, cadena: cadena },
      });
    },

    addCart(anuncio) {
      let item = {};
      let incluye = false;
      let contador = 0;
      item.producto = anuncio;
      item.cantidad = 1;
      item.subtotal = item.producto.precio * item.cantidad;

      if (this.carrito.length === 0) {
        this.carrito.push(item);
        // console.log(this.carrito);
        this.showToast("info");
      } else {
        while (contador < this.carrito.length && incluye === false) {
          console.log(
            "carrito idAnuncio: " +
              this.carrito[contador].producto.idAnuncio +
              " Item idAnuncio: " +
              item.producto.idAnuncio
          );
          if (
            this.carrito[contador].producto.idAnuncio == item.producto.idAnuncio
          ) {
            incluye = true;
            this.carrito[contador].cantidad =
              this.carrito[contador].cantidad + 1;
            this.carrito[contador].subtotal =
              this.carrito[contador].producto.precio *
              this.carrito[contador].cantidad;
            this.showToast("info");
          }
          contador++;
        }

        if (incluye === false) {
          this.carrito.push(item);
          this.showToast("info");
        }
      }
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

<style scoped></style>
