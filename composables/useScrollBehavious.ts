export default () => {
  const router = useRouter()
  router.afterEach(() => {
    document.querySelector('#J_main-wrapper')?.scroll(0, 0)
    document.querySelector('#J_aside-right-wrapper')?.scroll(0, 0)
    document.querySelector('#J_Container')?.scroll(0, 0)
  })
}
