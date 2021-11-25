<template>
  <div>
    <footer class="container-fluid">
      <div class="row text-center" style="background-color: black;">
        <div class="col-12 order-1 col-md-6 order-md-1">
          <div class="row row-cols-1 text-light">
            <div class="col text-light font-weight-bolder">Redes Sociales</div>
            <div class="col">
              <a
                class="btn rounded-circle facebook text-light p-1"
                style="height: 2rem; width: 2rem"
                ><b-icon-facebook/></a>
              <a
                class="btn rounded-circle twitter text-light p-1 ml-1"
                style="height: 2rem; width: 2rem"
                ><b-icon-twitter/></a>
              <a
                class="btn rounded-circle youtube text-light p-1 ml-1"
                style="height: 2rem; width: 2rem"
                ><b-icon-youtube/></a>
              <a
                class="btn rounded-circle instagram p-1 ml-1"
                style="height: 2rem; width: 2rem"
                ><b-icon-instagram/></a>
            </div>
          </div>
        </div>
        <div class="col-12 order-2 col-md-6 order-md-2">
          <div class="row row-cols-1 text-light">
            <div class="col text-light font-weight-bolder">Desarrollador</div>
            <div class="col">
              <p>Carlos Manuel Mendez Medina (MM18018) | mm18018@ues.edu.sv</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
    name: 'Pie',
};
</script>

<style scoped>
  .facebook {
  background-color: #1877f2;
}

.twitter {
  background-color: #1da1f2;
}

.youtube {
  background-color: #ff0000;
}

.instagram {
  background-color: #fafafa;
}
</style>
