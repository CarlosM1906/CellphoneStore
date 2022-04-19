<template>
  <div>
    <!--MODAL-->
    <b-modal
      size="xl"
      ref="modal"
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
    >
      <template #modal-header>
        <div class="modal-header bg-dark col-12">
          <h3 class="modal-tittle mx-auto text-white">
            <strong
              ><font-awesome-icon :icon="['fas', 'plus-square']" /> Nuevo
              Anuncio</strong
            >
          </h3>
        </div>
      </template>

      <div class="modal-body">
        <div class="container">
          <form class="was-validated">
            <div class="row">
              <!-- ESPECIFICACIONES -->
              <div
                class="
                  col-12 col-lg-6
                  bg-light
                  border
                  rounded-lg
                  shadow-sm
                  p-3
                  my-2
                  order-3 order-lg-1
                "
              >
                <div class="row my-2">
                  <div class="col-4 col-lg-3">
                    <label>Estado:</label>
                  </div>
                  <div class="col-6">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="state"
                        id="stateNew"
                        value="Nuevo"
                        v-model="nuevoAnuncio.estado"
                        required
                      />
                      <label class="form-check-label" for="stateNew"
                        >Nuevo</label
                      >
                    </div>

                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="state"
                        id="stateOld"
                        value="Usado"
                        v-model="nuevoAnuncio.estado"
                        required
                      />
                      <label class="form-check-label" for="stateOld"
                        >Usado</label
                      >
                    </div>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-4 col-lg-3">
                    <label>Marca:</label>
                  </div>
                  <div class="col-6">
                    <select
                      class="form-control"
                      id="brand"
                      required
                      v-model="nuevoAnuncio.marca"
                    >
                      <option selected disabled value="">Marca...</option>
                      <option>Samsung</option>
                      <option>Huawei</option>
                      <option>Apple</option>
                      <option>Xiaomi</option>
                      <option>Nokia</option>
                    </select>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-4 col-lg-3">
                    <label>Modelo:</label>
                  </div>
                  <div class="col-6">
                    <input
                      type="text"
                      class="form-control"
                      id="model"
                      v-model="nuevoAnuncio.modelo"
                      required
                    />
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-4 col-lg-3">
                    <label>Pantalla (in):</label>
                  </div>
                  <div class="col-6">
                    <input
                      type="number"
                      name="pantalla"
                      class="form-control"
                      step="0.1"
                      v-model="nuevoAnuncio.pantalla"
                      required
                    />
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-4 col-lg-3">
                    <label>Sistema:</label>
                  </div>
                  <div class="col-6">
                    <select
                      class="form-control"
                      id="os"
                      required
                      v-model="nuevoAnuncio.sistema"
                    >
                      <option selected disabled value="">Sistema...</option>
                      <option>Android</option>
                      <option>IOS</option>
                      <option>Windows</option>
                    </select>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-4 col-lg-3">
                    <label>ROM (GB):</label>
                  </div>
                  <div class="col-6">
                    <input
                      type="number"
                      name="rom"
                      class="form-control"
                      step="1"
                      v-model="nuevoAnuncio.rom"
                      required
                    />
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-4 col-lg-3">
                    <label>RAM (GB):</label>
                  </div>
                  <div class="col-6">
                    <input
                      type="number"
                      name="ram"
                      class="form-control"
                      step="1"
                      v-model="nuevoAnuncio.ram"
                      required
                    />
                  </div>
                </div>
              </div>
              <!-- ESPECIFICACIONES -->

              <!--INFORMACION-->
              <div class="col-12 col-lg-6 p-3 my-2 order-2">
                <div class="row my-2">
                  <div class="col-3">
                    <label>Titulo:</label>
                  </div>
                  <div class="col-12 col-sm">
                    <input
                      id="title"
                      type="text"
                      class="form-control"
                      v-model="nuevoAnuncio.titulo"
                      required
                    />
                    <small id="titleHelp" class="form-text text-muted">
                      Marca y Modelo.
                    </small>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-3">
                    <label>Subtitulo:</label>
                  </div>
                  <div class="col-12 col-sm">
                    <input
                      id="subTitle"
                      type="text"
                      class="form-control"
                      v-model="nuevoAnuncio.subtitulo"
                      required
                    />
                    <small id="subTitleHelp" class="form-text text-muted">
                      Inf. General: RAM, ROM, Tipo de Pantalla, etc.
                    </small>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-3">
                    <label>Vendedor:</label>
                  </div>
                  <div class="col-12 col-sm">
                    <input
                      id="seller"
                      type="text"
                      class="form-control"
                      v-model="nuevoAnuncio.vendedor"
                      required
                    />
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-3">
                    <label>Telefono:</label>
                  </div>
                  <div class="col-12 col-sm">
                    <input
                      id="tel"
                      type="tel"
                      class="form-control"
                      required
                      v-model="nuevoAnuncio.telefono"
                    />
                    <small id="telHelp" class="form-text text-muted">
                      Region + telefono.
                    </small>
                  </div>
                </div>
                <div class="row form-group my-2">
                  <div class="col-3">
                    <label>Descripcion:</label>
                  </div>
                  <div class="col-12 col-sm">
                    <textarea
                      id="descripcion"
                      class="form-control"
                      v-model="nuevoAnuncio.descripcion"
                      required
                    ></textarea>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-3">
                    <label>Precio:</label>
                  </div>
                  <div class="col-auto col-lg-3">
                    <input
                      type="number"
                      step="0.01"
                      required
                      v-model="nuevoAnuncio.precio"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <!--INFORMACION-->

              <!--IMAGENES-->
              <div
                class="
                  col-12 col-lg-6
                  bg-light
                  border
                  rounded-lg
                  shadow-sm
                  p-3
                  my-2
                  order-1 order-lg-3
                "
              >
                <!-- CAROUSEL -->
                <div class="row d-lg-flex">
                  <div class="col-12">
                    <template>
                      <div>
                        <b-carousel
                          indicators
                          controls
                          :interval="4000"
                          id="imgAnuncio"
                          class="carousel slide"
                          v-if="previewImages.length > 0"
                        >                        
                          <div
                            class="carousel-item active"
                            v-for="(imagen, id) in previewImages"
                            :key="id"
                          >
                            <b-img
                              :src="imagen"
                              class="d-block w-100 rounded-lg"
                              alt="..."
                            />

                            <div class="carousel-caption d-md-grid">
                              <button
                                class="btn btn-danger btn-lg"
                                type="button"
                                @click="delImage(id)"
                              >
                                <b-icon-trash-fill />
                              </button>
                            </div>
                          </div>
                        </b-carousel>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="row d-lg-flex">
                  <div class="col-12 my-auto mx-auto text-center mt-2">
                    <input
                      class="form-control"
                      @change="selectImages($event)"
                      type="file"
                      id="formFile"
                      accept="image/*"
                      required
                      multiple
                      style="display: none;"
                    />

                    <button
                      type="button"
                      class="btn btn-dark btn-lg"
                      @click="openUpload"
                      id="save"
                    >
                      Agregar Imagen
                      <font-awesome-icon :icon="['fas', 'plus-square']" />
                    </button>
                  </div>
                </div>
                <!-- CAROUSEL -->
              </div>
              <!-- IMAGENES -->

              <!--BUTTONS-->
              <div class="col-12 col-lg-6 mt-auto mb-auto text-center order-4">
                <button
                  type="button"
                  class="btn btn-outline-cancel btn-lg"
                  @click="hideModal"
                >
                  Cancelar
                  <font-awesome-icon :icon="['fas', 'times']" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-dark btn-lg ml-md-3 ml-1"
                  @click="save"
                  id="save"
                  :disabled="deshabilitar"
                  
                >
                  Guardar
                  <font-awesome-icon :icon="['fas', 'check']" />
                </button>
              </div>
              <!-- BUTTONS -->
            </div>
          </form>
        </div>
      </div>
    </b-modal>
    <!-- MODAL -->
  </div>
</template>

<script>
import { db } from "../db";
import { storage } from "../db";

export default {
  name: "NuevoAnuncio",
  props: ["modal", "idAnuncio"],
  data() {
    return {
      show: false, //Variable que controla el muestreo del modal, variable que se envia al componente padre con un $emit
      bandera: false,
      slide: 0,
      sliding: null,
      upImages: [],
      previewImages: [],
      autId: 0,
      today: new Date(),

      //Campos del formulario
      nuevoAnuncio: {
        idAnuncio: 0,
        estado: "",
        marca: "",
        modelo: "",
        pantalla: null,
        sistema: "",
        rom: null,
        ram: null,
        titulo: "",
        subtitulo: "",
        vendedor: "",
        telefono: "",
        descripcion: "",
        precio: null,
        fecha: null,
      },
      //Campos del formulario
    };
  },

  computed: {
    deshabilitar: function () {
      let _this = this;
      if (
        !_this.nuevoAnuncio.estado ||
        !_this.nuevoAnuncio.marca ||
        !_this.nuevoAnuncio.modelo ||
        !_this.nuevoAnuncio.pantalla ||
        !_this.nuevoAnuncio.sistema ||
        !_this.nuevoAnuncio.rom ||
        !_this.nuevoAnuncio.ram ||
        !_this.nuevoAnuncio.titulo ||
        !_this.nuevoAnuncio.subtitulo ||
        !_this.nuevoAnuncio.vendedor ||
        !_this.nuevoAnuncio.telefono ||
        !_this.nuevoAnuncio.descripcion ||
        !_this.nuevoAnuncio.precio ||
        _this.upImages.length === 0
      ) {
        return true;
      } else {
        return false;
      }
    },
  },

  mounted() {
    this.show = this.modal;
    this.nuevoAnuncio.idAnuncio = this.idAnuncio;    
    this.showModal();
  },

  methods: {
    showModal() {
      if (this.modal) {
        this.$refs["modal"].show();
      }
    },

    hideModal() {
      this.$refs["modal"].hide();
      this.$emit("hide", false);      
    },

    guardar() {
      this.$refs["modal"].hide();
      this.$emit("hide", false);
    },

    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },

    openUpload() {
      document.getElementById("formFile").click();
    },
    selectImages(event) {      
      let reader = new FileReader();
      let _this = this;

      for (let index = 0; index < event.target.files.length; index++) {
        this.upImages.push(event.target.files[index]);
        reader.readAsDataURL(event.target.files[index]);

        reader.onload = (e) => {
          _this.previewImages.push(e.target.result);
        };
        reader = new FileReader();
      }            
    },

    delImage(id) {
      this.upImages.splice(id, 1);
      this.previewImages.splice(id, 1);
    },

    save() {
      let archivo;      
      this.nuevoAnuncio.fecha = new Date()
      db.collection('anuncios').add(this.nuevoAnuncio)      
      for (let index = 0; index < this.upImages.length; index++ ) {        
        archivo = storage.ref(`${this.nuevoAnuncio.idAnuncio.toString()}/${this.upImages[index].name}`)
        archivo.put(this.upImages[index]).then(() => {          
        })        
      }
      this.previewImages = []
      this.$emit('toast', 'success');
      this.hideModal()
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
  box-shadow: 0 0 0 0.2rem rgba(43, 147, 72, 0.5) !important;
}
</style>
