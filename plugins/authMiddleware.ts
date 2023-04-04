export default defineNuxtPlugin(() => {
  addRouteMiddleware((to, from) => {
    console.log(to, from)
  })
})