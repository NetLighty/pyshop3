<!-- <template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="app">
      <div class="q-pa-md row justify-center">
        <div class="q-gutter-y-md">
          <q-tabs dense class="nav-menu">
            <q-route-tab
              v-for="(navItem, index) in navItems"
              :key="index"
              :label="navItem.displayName"
              :to="navItem.link.path" replace
            />
          </q-tabs>
        </div>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { navItems } from 'src/data/navItems';
import UserService from 'src/services/UserService';
import { useStore } from 'src/stores/store';
import { computed } from 'vue';

const store = useStore();
const isAuth = computed(() => store.isAuth);
const user = computed(() => store.user);

export default {
  setup() {
    return {
      store,
      isAuth,
      navItems,
      user
    }
  }
}
</script>

<style lang="scss">
.app {
  height: 100vh;
  width: 100vw;
}

.nav-menu {
  color: $white;
  background: transparent;
}
</style>
 -->
