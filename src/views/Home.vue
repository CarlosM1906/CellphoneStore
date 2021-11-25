<template>
  <div class="bg-light" style="width: 100%">
    <!-- NAVBAR -->
    <navbar
      @show="showModal"
      v-bind:carrito="
        $route.params.carrito != undefined ? $route.params.carrito : carrito
      "
      v-bind:search="$route.params.cadena ? $route.params.cadena : ''"
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
      @toast="save"
      v-bind:modal="modal"
      v-bind:idAnuncio="anuncios.length > 0 ? siguienteAnuncio : 1"
    ></nuevo-anuncio>
    <!-- MODAL -->

    <!-- PRODUCTOS -->
    <br /><br /><br />
    <div class="row mt-3">
      <div class="col-lg-3 col-md-4 d-none d-md-block" style="text-align: left">
        <!-- FILTROS -->
        <div id="filtros" class="collapse d-md-block">
          <filtros v-bind:filtros="filtros" @checked="onCheck"></filtros>
        </div>
        <!-- FILTROS -->
      </div>

      <div class="col">
        <div>
          <header>
            <div class="row">
              <div class="col-1 col-lg-auto ml-3 ml-md-auto my-auto">
                <span class="ml-auto mr-2 my-md-auto">Items por pagina:</span>
              </div>

              <div class="col-3 col-md-auto">
                <b-dropdown :text="itemsPages" variant="white" class="my-2">
                  <b-dropdown-item
                    @click="(itemsPages = '5'), dataPerPage(pagina)"
                    >5</b-dropdown-item
                  >

                  <b-dropdown-item
                    @click="(itemsPages = '10'), dataPerPage(pagina)"
                    >10</b-dropdown-item
                  >
                  <b-dropdown-item
                    @click="(itemsPages = '15'), dataPerPage(pagina)"
                    >15</b-dropdown-item
                  >

                  <b-dropdown-item
                    @click="(itemsPages = '20'), dataPerPage(pagina)"
                    >20</b-dropdown-item
                  >
                </b-dropdown>
              </div>

              <div class="col-2 col-md-auto my-auto">
                <span class="my-auto">Ordenar por: </span>
              </div>

              <div class="col-3 col-md-auto my-auto">
                <b-dropdown :text="orderBy" variant="white" class="my-2" right>
                  <b-dropdown-item
                    @click="(orderBy = 'Precio'), order(orderBy, true)"
                    >Precio</b-dropdown-item
                  >
                  <b-dropdown-item
                    @click="(orderBy = 'Fecha'), order(orderBy, true)"
                    >Fecha</b-dropdown-item
                  >
                </b-dropdown>
              </div>

              <div class="col-2 col-md-2 col-lg-auto my-auto">
                <button
                  class="btn btn-dark d-inline mr-5 my-auto order-md-5 order-3"
                  type="button"
                  @click="order(orderBy)"
                  style="background-color: black"
                >
                  <font-awesome-icon
                    class="h4 mb-0"
                    :icon="['fas', 'sort-numeric-down']"
                    v-if="desc"
                  />
                  <font-awesome-icon
                    class="h4 mb-0"
                    :icon="['fas', 'sort-numeric-up']"
                    v-if="!desc"
                  />
                </button>
              </div>

              <div class="col-6 col-md-auto"></div>
            </div>
          </header>

          <!-- CARDS -->
          <div class="row" v-if="anunciosCopy.length > 0">
            <div
              class="col-12 col-md-11 ml-md-4 my-2 ml-2"
              style="text-align: center"
              v-for="(card, id) in paginatedItems"
              :key="id"
            >
              <card
                @addCart="addCart"
                v-bind:anuncio="card"
                v-bind:carrito="carrito"
              ></card>
            </div>
          </div>
          <!-- CARDS -->

          <div class="row col-11 offset-lg-1 offset-md-1 ml-4">
            <div class="col-12 mx-auto">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li
                    class="page-item"
                    v-for="(page, id) in totalPaginas()"
                    :key="id"
                  >
                    <a
                      class="page-link"
                      id="page1"
                      @click="dataPerPage(page)"
                      >{{ page }}</a
                    >
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- PRODUCTOS -->

    <!-- PAGINADOR -->
    <div class="row offset-md-4 offset-lg-3"></div>
    <!-- PAGINADOR -->

    <!-- FOOTER -->
    <div style="width: 100%"><pie></pie></div>

    <!-- FOOTER -->
  </div>
</template>

<script>
import { db } from "../db";
import Navbar from "../components/Navbar.vue";
import NuevoAnuncio from "../components/NuevoAnuncio.vue";
import Card from "../components/Card.vue";
import Pie from "../components/Pie.vue";
import Filtros from "../components/Filtros.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    NuevoAnuncio,
    Card,
    Pie,
    Filtros,
  },

  data() {
    return {
      modal: false, //Variable que controla el muestreo del modal
      desc: true,
      itemsPages: "5",
      paginatedItems: [], //Arreglo para mostrar los datos paginados
      pagina: 1,
      orderBy: "Precio",
      anuncios: [],
      anunciosCopy: [],
      siguienteAnuncio: 0,
      prueba: [],
      filtros: [
        { filtro: "nuevo", checked: false },
        { filtro: "usado", checked: false },
        { filtro: "samsung", checked: false },
        { filtro: "huawei", checked: false },
        { filtro: "nokia", checked: false },
        { filtro: "iphone", checked: false },
        { filtro: "xiaomi", checked: false },
        { filtro: "android", checked: false },
        { filtro: "windows", checked: false },
        { filtro: "ios", checked: false },
      ],
      carrito: [],
      search: [],
      estados: ["nuevo", "usado"],
      estadosSelected: [],
      marcas: ["samsung", "huawei", "nokia", "iphone", "xiaomi"],
      marcasSelected: [],
      sistemas: ["android", "windows", "ios"],
      sistemasSelected: [],
    };
  },

  firestore: {
    anuncios: db.collection("anuncios"),
  },

  mounted() {
    this.onMount();
    if (this.$route.params.carrito != undefined) {
      this.carrito = this.$route.params.carrito;
    }
  },

  computed: {
    AnunciosFiltrados: function () {
      let _this = this;
      var condicion = { marca: "", sistema: "", precio: "", estado: "" };
      var arrayFiltrado = [];

      if (_this.marcasSelected.length > 0) {
        _this.marcasSelected.forEach((marca) => {
          condicion.marca = condicion.marca.concat(
            "anuncio['marca'].toLowerCase()=='",
            marca.toLowerCase(),
            "'||"
          );
        });
      } else {
        _this.marcas.forEach((marca) => {
          condicion.marca = condicion.marca.concat(
            "anuncio['marca'].toLowerCase()=='",
            marca.toLowerCase(),
            "'||"
          );
        });
      }
      if (_this.sistemasSelected.length > 0) {
        _this.sistemasSelected.forEach((sistema) => {
          condicion.sistema = condicion.sistema.concat(
            "anuncio['sistema'].toLowerCase()=='",
            sistema.toLowerCase(),
            "'||"
          );
        });
      } else {
        _this.sistemas.forEach((sistema) => {
          condicion.sistema = condicion.sistema.concat(
            "anuncio['sistema'].toLowerCase()=='",
            sistema.toLowerCase(),
            "'||"
          );
        });
      }
      if (_this.estadosSelected.length > 0) {
        _this.estadosSelected.forEach((estado) => {
          condicion.estado = condicion.estado.concat(
            "anuncio['estado'].toLowerCase()=='",
            estado.toLowerCase(),
            "'||"
          );
        });
      } else {
        _this.estados.forEach((estado) => {
          condicion.estado = condicion.estado.concat(
            "anuncio['estado'].toLowerCase()=='",
            estado.toLowerCase(),
            "'||"
          );
        });
      }
      condicion.estado = condicion.estado.substring(
        0,
        condicion.estado.length - 2
      );
      condicion.marca = condicion.marca.substring(
        0,
        condicion.marca.length - 2
      );
      condicion.sistema = condicion.sistema.substring(
        0,
        condicion.sistema.length - 2
      );
      arrayFiltrado = _this.anuncios.filter(function (anuncio) {
        if (anuncio == []) {
          console.log();
        }
        return (
          eval(condicion.marca) &&
          eval(condicion.sistema) &&
          eval(condicion.estado)
        );
      });
      return arrayFiltrado;
    },
  },

  methods: {
    onMount() {
      this.anunciosCopy = [];
      db.collection("anuncios")
        .get()
        .then((res) => {
          res.docs.map((doc) => {
            this.anunciosCopy.push(doc.data());
            this.anunciosCopy.sort((a, b) => {
              return b.precio - a.precio;
            });
            this.paginatedItems = this.anunciosCopy.slice(0, 5);
            if (this.$route.params.cadena) {              
              this.buscar(this.$route.params.cadena);
            }
          });
        });
      // this.anunciosCopy = this.anuncios;
      this.paginatedItems = this.anunciosCopy;
    },

    save() {
      this.anunciosCopy = this.anuncios.slice();
      db.collection("anuncios")
        .get()
        .then((res) => {
          res.docs.map((doc) => {
            this.anunciosCopy.push(doc.data());
            this.anunciosCopy.sort((a, b) => {
              return b.precio - a.precio;
            });
            this.order(this.orderBy, true);
            this.filtrar();
          });
        });
      this.showToast("success");
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

    onCheck(filtros) {
      this.estadosSelected = filtros[0];
      this.marcasSelected = filtros[1];
      this.sistemasSelected = filtros[2];
      this.filtrar();
    },

    filtrar() {
      this.anunciosCopy = this.AnunciosFiltrados.slice();
      if (this.anunciosCopy.length > 0) {
        this.order(this.orderBy, true);
      }
    },

    buscar(cadena) {
      if (cadena.length > 0) {        
        this.anunciosCopy = this.AnunciosFiltrados.filter((item) => {
          let x = item.titulo.toLowerCase().match(cadena.toLowerCase());
          return x;
        });
        if (this.anunciosCopy.length > 0) {
          this.order(this.orderBy, true);
        }
      } else {
        this.anunciosCopy = this.AnunciosFiltrados.slice();        
        this.order(this.orderBy, true);
      }
    },

    totalPaginas() {
      return Math.ceil(this.anunciosCopy.length / Number(this.itemsPages));
    },

    dataPerPage(numPagina = this.totalPaginas()) {
      if (numPagina > this.totalPaginas()) {
        numPagina = this.totalPaginas();
      }
      this.pagina = numPagina;
      this.paginatedItems = [];
      let inicio = numPagina * this.itemsPages - this.itemsPages;
      let fin = numPagina * this.itemsPages;
      if (this.anunciosCopy.length < fin) {
        fin = this.anunciosCopy.length;
      }
      for (let index = inicio; index < fin; index++) {
        this.paginatedItems.push(this.anunciosCopy[index]);
      }
      var top = this.$refs["top"].offsetTop;
      window.scrollTo(0, top);
    },

    hideModal(modal) {
      this.dataPerPage(this.pagina);
      this.modal = modal;
    },

    showModal(modal) {
      this.getNextId();
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
          this.order(this.orderBy, true);
        }
        this.$bvToast.toast(content, {
          title: title,
          variant: variant,
          solid: true,
        });
      }
    },

    order(filtro, drop = false) {
      if (drop === false) {
        this.desc = !this.desc;
      }
      if (!this.desc) {
        this.anunciosCopy.sort(function (a, b) {
          return a[filtro.toLowerCase()] - b[filtro.toLowerCase()]; //Ordenar ascendentemente
        });
      }

      if (this.desc) {
        this.anunciosCopy.sort(function (a, b) {
          return b[filtro.toLowerCase()] - a[filtro.toLowerCase()]; //Ordenar descendentemente
        });
      }
      this.dataPerPage(this.pagina);
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
  },
};
</script>

<style scoped>
.box-shadow {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.page-link {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #ff7402;
  background-color: #fff;
  border: 1px solid #dee2e6;
}

.page-link:hover {
  z-index: 2;
  color: #8d4204;
  text-decoration: none;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.page-link:focus {
  z-index: 3;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(255, 123, 0, 0.25);
  color: #8d4204;
}
</style>
