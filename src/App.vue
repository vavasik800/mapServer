<template>
  <body class="d-flex flex-column min-vh-100">
  <header>
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="../public/favicon.ico" alt="Logo" width="30" height="24"
               class="d-inline-block align-text-top">
          MapServer
        </a>
      </div>
    </nav>
  </header>

  <content></content>
  <footer class="mt-auto pb-1 ps-1">
    <div class="container-fluid d-flex justify-content-between">
      <p>
        RUSLAN_GOLD @ 2023
      </p>
      <p>
        Разработано с любовью
       <font-awesome-icon icon="fa-regular fa-heart" size="lg" style="color: #ff1100"/>
      </p>
    </div>
  </footer>
  </body>

</template>


<script>

</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.content {
  flex: 1 0 auto;
}

.footer {
  flex: 0 0 auto;
}
</style>

