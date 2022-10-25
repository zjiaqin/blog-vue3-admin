/* stylelint-disable indentation */
<template>
  <div class="wrapper">
    <Transition name="login-fade" class="form">
      <form-login v-if="panel == 'login'"></form-login> </Transition
    ><Transition name="reg-fade" class="form"
      ><form-register v-if="panel == 'reg'"></form-register
    ></Transition>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import FormLogin from './FormLogin.vue'
import FormRegister from './FormRegister.vue'
const panel = ref('login')

provide('panel', panel)
</script>

<style lang="less" scoped>
// .wrapper {
//   display: flex;
//   height: 100%;
//   background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
//     -30vmax -10vmax, 50vmax 50vmax;
//   background-repeat: no-repeat;
//   animation: 8s move linear infinite;
//   background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax, 50vmax 50vmax,
//     90vmax 90vmax;
//   background-color: #e493d0;
//   background-image: radial-gradient(
//       closest-side,
//       rgb(235 105 78 / 100%),
//       rgb(235 105 78 / 0%)
//     ),
//     radial-gradient(closest-side, rgb(243 11 164 / 100%), rgb(243 11 164 / 0%)),
//     radial-gradient(
//       closest-side,
//       rgb(254 234 131 / 100%),
//       rgb(254 234 131 / 0%)
//     ),
//     radial-gradient(
//       closest-side,
//       rgb(170 142 245 / 100%),
//       rgb(170 142 245 / 0%)
//     ),
//     radial-gradient(
//       closest-side,
//       rgb(248 192 147 / 100%),
//       rgb(248 192 147 / 0%)
//     );

//   .form {
//     z-index: 99;
//     margin: auto;
//   }
// }

// .wrapper::after {
//   position: fixed;
//   top: 0;
//   left: 0;
//   display: block;
//   width: 100%;
//   height: 100%;
//   content: '';
//   backdrop-filter: blur(10px);
// }

// @keyframes move {
//   /* 动画初始状态，和结束状态 */
//   0%,
//   100% {
//     /* 设置位置 */
//     background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
//       -30vmax -10vmax, 50vmax 50vmax;

//     /* 以屏幕长的一边计算，控制它们的大小 */
//     background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
//       110vmax 110vmax, 90vmax 90vmax;
//   }

//   25% {
//     /* 设置位置 */
//     background-position: -60vmax -60vmax, 50vmax -40vmax, 0 10vmax,
//       -40vmax -20vmax, 40vmax 40vmax;
//     background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax,
//       90vmax 90vmax, 60vmax 60vmax;
//   }

//   50% {
//     /* 设置位置 */
//     background-position: -70vmax -70vmax, 40vmax -40vmax, 0 10vmax,
//       -50vmax -30vmax, 30vmax 30vmax;
//     background-size: 90vmax 90vmax, 100vmax 100vmax, 80vmax 80vmax,
//       90vmax 90vmax, 60vmax 60vmax;
//   }

//   75% {
//     /* 设置位置 */
//     background-position: -60vmax -60vmax, 60vmax -30vmax, 10vmax 10vmax,
//       -40vmax -40vmax, 50vmax 50vmax;
//     background-size: 80vmax 80vmax, 70vmax 70vmax, 80vmax 80vmax, 70vmax 70vmax,
//       50vmax 50vmax;
//   }
// }
//
</style>
<style lang="less" scoped>
.wrapper {
  position: relative;
  overflow: hidden;
  height: 100%;
  background-color: #e493d0;
  background-image: radial-gradient(
    circle,
    rgb(254 234 131 / 100%),
    rgb(248 192 147 / 100%),
    rgb(254 234 131 / 0%)
  );

  .form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    width: 350px;
  }
}

.login-fade-enter-active,
.reg-fade-enter-active {
  transition: all 0.8s ease;
}

.login-fade-leave-active,
.reg-fade-leave-active {
  transition: all 0.5s ease;
}

.login-fade-enter-from,
.reg-fade-enter-from {
  margin-top: 400px;
  opacity: 0;
}

.login-fade-leave-to,
.reg-fade-leave-to {
  opacity: 0;
}
</style>
