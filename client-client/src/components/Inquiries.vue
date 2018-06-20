<template>
  <form>
    <div class="form-group">
      <label for="nama">Nama</label>
      <input type="text" class="form-control" id="nama" placeholder="Nama Anda">
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    </div>
    <div class="form-group">
      <label for="phone">No. HP</label>
      <input type="text" class="form-control" id="phone" placeholder="Nomor HP">
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Pertanyaan</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <div class="form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
export default {

}
</script>

<style>

</style>
