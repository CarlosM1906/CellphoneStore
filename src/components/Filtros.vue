<template>
  <div>    
      <b-card
        bg-variant=""
        style="text-align: center"
        class="mb-2 bg-light box-shadow ml-2 d-none d-md-block"
      >
        <h4 class="my-auto">Filtros</h4>
      </b-card>
      <div class="card w100 bg-light bg-light border-0">
        <template>
          <div class="accordion ml-2" role="tablist">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                  block
                  v-b-toggle.estado
                  variant="white"
                  style="text-align: left"
                  class="d-inline col-11"
                  ><h5 class="d-inline">Estado</h5>
                </b-button>
                <b-icon-caret-down-fill v-b-toggle.estado class="d-inline" />
              </b-card-header>
              <b-collapse id="estado" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-form-checkbox id="nuevo" value="nuevo" @change="onCheck" v-model="estados" unchecked-value="">
                    Nuevo                    
                  </b-form-checkbox>

                  <b-form-checkbox id="usado" value="usado" @change="onCheck" v-model="estados" unchecked-value="">
                    Usado                    
                  </b-form-checkbox>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                  block
                  v-b-toggle.marca
                  variant="white"
                  style="text-align: left"
                  class="d-inline col-11"
                  ><h5 class="d-inline">Marca</h5>
                </b-button>
                <b-icon-caret-down-fill v-b-toggle.marca class="d-inline" />
              </b-card-header>
              <b-collapse id="marca" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-form-checkbox id="samsung" value="samsung" @change="onCheck" v-model="marcas" unchecked-value="">
                    Samsung                    
                  </b-form-checkbox>

                  <b-form-checkbox id="huawei" value="huawei" @change="onCheck" v-model="marcas" unchecked-value="">
                    Huawei                    
                  </b-form-checkbox>

                  <b-form-checkbox id="nokia" value="nokia" @change="onCheck" v-model="marcas" unchecked-value="">
                    Nokia                    
                  </b-form-checkbox>

                  <b-form-checkbox id="apple" value="apple" @change="onCheck" v-model="marcas" unchecked-value="">
                    Apple                    
                  </b-form-checkbox>

                  <b-form-checkbox id="xiaomi" value="xiaomi" @change="onCheck" v-model="marcas" unchecked-value="">
                    Xiaomi                    
                  </b-form-checkbox>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                  block
                  v-b-toggle.sistema
                  variant="white"
                  style="text-align: left"
                  class="d-inline col-11"
                  ><h5>Sistema</h5></b-button
                >
                <b-icon-caret-down-fill v-b-toggle.sistema class="d-inline" />
              </b-card-header>
              <b-collapse id="sistema" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-form-checkbox id="android" value="android" @change="onCheck" v-model="sistemas" unchecked-value="">
                    Android                    
                  </b-form-checkbox>

                  <b-form-checkbox id="windows" value="windows" @change="onCheck" v-model="sistemas" unchecked-value="">
                    Windows                    
                  </b-form-checkbox>

                  <b-form-checkbox id="ios" value="ios" @change="onCheck" v-model="sistemas" unchecked-value="">
                    IOS 
                  </b-form-checkbox>
                </b-card-body>
              </b-collapse>
            </b-card>
            
          </div>
        </template>
      </div>    
  </div>
</template>

<script>
export default {
  name: "Filtros",
  props: ['filtros'],
  data() {
    return {
      estados: [],
      marcas: [],
      sistemas: [],
    }
  },

  mounted() {
    this.onMount()
  },

  methods: {
    onMount(){
      this.filters = this.filtros
    },

    onCheck(){          
      this.$emit('checked', [this.estados, this.marcas, this.sistemas]);
    }
  },
};
</script>

<style lang="scss" scoped></style>
