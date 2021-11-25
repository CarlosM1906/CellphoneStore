<template>
  <div>
    <b-navbar
      toggleable="md"
      class="navbar navbar-light navbar-expand-md fixed-top"
      style="background-color: #ff7402"
      id="navegacion"
    >
      <div class="container-fluid">
        <!-- TOGGLER BUTTON -->
        <b-navbar-toggle target="sidebar-backdrop"></b-navbar-toggle>
        <!-- TOGGLER BUTTON -->

        <!-- NAVBAR BRAND -->
        <router-link
          class="navbar-brand d-none d-md-inline"
          :to="{ name: 'Home', params: { carrito: carrito, cadena: cadena } }"
        >
          <strong>CellPhone Store</strong>
          <b-icon-phone-fill class="h4 mb-0"></b-icon-phone-fill>
        </router-link>
        <!-- NAVBAR BRAND -->

        <!-- BARRA DE BUSQUEDA -->
        <form
          class="
            form-inline
            col-9 col-sm-auto col-md-3 col-lg-5 col-xl-6 col-xxl-6
          "
          @submit="onSubmit"
        >
          <div class="input-group col-11">
            <div class="input-group-prepend">
              <button
                class="btn btn-outline-dark btn-lg pb-0"
                style="border: 0px"
                type="button"
                @click="buscar"
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-search h5 text-light"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                  />
                </svg>
              </button>
            </div>
            <input
              class="form-control col-12"
              type="text"
              placeholder="Buscar"
              v-model="cadena"
            />
          </div>
        </form>
        <!-- BARRA DE BUSQUEDA -->

        <!-- NAVBAR ITEMS -->
        <div class="collapse navbar-collapse col-auto">
          <ul
            class="nav navbar-nav ml-auto"
            data-toggle="collapse"
            data-target="#menuNavegacion"
          >
            <li
              class="nav-item"
              style="margin-right: 2.5px; margin-left: 2.5px"
            >
              <router-link
                :to="{ name: 'Home', params: { carrito: carrito, cadena: cadena } }"
                class="btn btn-dark"
                style="background-color: black"
                ><font-awesome-icon :icon="['fas', 'home']" />
                Inicio</router-link
              >
            </li>
            <li
              class="nav-item"
              style="margin-right: 2.5px; margin-left: 2.5px"
            >
              <router-link
                :to="{ name: 'Home', params: { carrito: carrito, cadena: cadena } }"
                class="btn btn-dark"
                style="background-color: black"
                ><font-awesome-icon :icon="['fas', 'chart-line']" />
                Estadisticas</router-link
              >
            </li>
            <li
              class="nav-item"
              style="margin-right: 2.5px; margin-left: 2.5px"
            >
              <a
                class="nav-link btn d-none d-md-inline"
                @click="showModal"
                style="font-size: 30px; color: black"
              >
                <b-icon-plus-circle-fill class=""></b-icon-plus-circle-fill>
              </a>
            </li>
            <li
              class="nav-item"
              style="margin-right: 2.5px; margin-left: 2.5px"
            >
              <router-link
                :to="{ name: 'Cart', params: { carrito: carrito } }"
                class="btn btn-dark"
                style="background-color: black"
                ><font-awesome-icon :icon="['fas', 'cart-plus']" />
                <span
                  class="
                    position-absolute
                    mt-0
                    me-0
                    translate-middle
                    badge badge-light
                    rounded-pill
                    bg-light
                    text-black
                  "
                >
                  {{ cart.length }}
                  <span class="visually-hidden"></span>
                </span>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- NAVBAR ITEMS -->

        <!-- SIDEBAR -->
        <b-sidebar
          id="sidebar-backdrop"
          backdrop-variant="dark"
          backdrop
          no-header
          shadow
          class="d-md-none"
        >
          <template #default="{ hide }">
            <div
              class="border-bottom border-2 border-dark py-3"
              style="background-color: #ff7402"
            >
              <div class="col-10 d-inline">
                <b-icon-phone-fill class="h4 mb-0" />
                <h4 class="d-inline">CellPhone Store</h4>
              </div>

              <div class="col-2 d-inline">
                <button
                  type="button"
                  @click="hide"
                  class="d-inline btn-close close"
                  aria-label="Close"
                >
                  <b-icon-x class="h2"></b-icon-x>
                </button>
              </div>
            </div>

            <div>
              <ul class="nav nav-pills flex-column">
                <li class="nav-item" style="text-align: left">
                  <router-link
                    :to="{ name: 'Home', params: { carrito: carrito, cadena: cadena } }"
                    class="
                      nav-link
                      text-black
                      border-bottom border-1 border-dark
                    "
                    @click.native="hide"
                    style="
                      border-radius: 0px;
                      background-color: white;
                      color: black;
                    "
                    ><font-awesome-icon :icon="['fas', 'home']" />
                    Inicio</router-link
                  >
                </li>

                <li class="nav-item" style="text-align: left">
                  <router-link
                    to=""
                    class="
                      nav-link
                      text-black
                      border-bottom border-1 border-dark
                    "
                    @click.native="showModal"
                    style="
                      border-radius: 0px;
                      background-color: white;
                      color: black;
                    "
                    ><font-awesome-icon :icon="['fas', 'plus-circle']" /> Nuevo
                    Anuncio</router-link
                  >
                </li>

                <li class="nav-item" style="text-align: left">
                  <router-link
                    :to="{ name: 'Cart', params: { carrito: carrito } }"
                    class="
                      nav-link
                      text-black
                      border-bottom border-1 border-dark
                    "
                    style="
                      border-radius: 0px;
                      background-color: white;
                      color: black;
                    "
                    ><font-awesome-icon :icon="['fas', 'cart-plus']" />
                    Carrito</router-link
                  >
                </li>

                <li class="nav-item" style="text-align: left">
                  <router-link
                    :to="{ name: 'Home', params: { carrito: carrito, cadena: cadena } }"
                    class="
                      nav-link
                      text-black
                      border-bottom border-1 border-dark
                    "
                    style="
                      border-radius: 0px;
                      background-color: white;
                      color: black;
                    "
                    ><font-awesome-icon :icon="['fas', 'chart-line']" />
                    Estadisticas</router-link
                  >
                </li>
              </ul>
            </div>
          </template>
        </b-sidebar>
        <!-- SIDEBAR -->
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  components: {},
  props: ["carrito", "search"],

  data() {
    return {
      modal: false, //Variable que controla el muestreo del modal, variable que se envia al componente padre con un $emit
      cart: [],
      cadena: "",
    };
  },

  mounted() {
    if (this.carrito != undefined) {
      this.cart = this.carrito;
    }

    if(this.search){
      this.cadena = this.search
    }
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.buscar()
    },

    showModal() {
      this.modal = true;
      this.$emit("show", this.modal);
    },

    buscar() {
      this.$emit("buscar", this.cadena);
    },
  },
};
</script>

<style scoped></style>
