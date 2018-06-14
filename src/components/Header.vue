<template>
    <navbar>
        <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
            &#9776;
        </button>
        <ul class="nav navbar-nav d-md-down-none">
            <li class="nav-item">
                <a class="nav-link navbar-toggler sidebar-toggler" @click="sidebarMinimize">&#9776;</a>
            </li>

        </ul>

        <ul class="nav navbar-nav ml-auto">

            <Dropdown class="nav-item">
                <a href="" @click="Logout">
                    <p class="dropdown-itemp">
                        <Icon type="power"></Icon>
                        Logout
                    </p>
                </a>
            </Dropdown>
        </ul>
    </navbar>
</template>
<script>

  import navbar from './Navbar';

  export default {
    name: 'header',
    components: {
      navbar,

    },
    methods: {
      Logout(e) {
        e.preventDefault();
        this.$store.dispatch('LogOut').then(() => {
          window.location.reload();
          // this.$router.push({path: '/login'});
        }).catch(err => {
          this.$Message.error(err);
        });
      },
      click() {
        // do nothing
      },
      sidebarMinimize(e) {
        e.preventDefault();

        document.body.classList.toggle('sidebar-minimized');
      },
      mobileSidebarToggle(e) {
        e.preventDefault();

        document.body.classList.toggle('sidebar-mobile-show');
      },
    },

    created() {
      // if (this.$$state.token == null) {
      //   this.$store.dispatch('Flash_UserInfo').then(res => {
      //     console.log(res);
      //   }).catch(err => {
      //     this.$Message.error(err);
      //   });
      // }
    }
  };
</script>

<style type="text/css" scoped>
    .dropdown-itemp {
        text-align: left;
        font-size: 15px;
        padding: 10px;
    }

    .header-item .ivu-dropdown-item {
        padding: 15px;
    }

    .header-item {
        width: 130px;
        /*background-color: #20a8d8;*/
        /*background-color: white;*/

        height: 55px;

    }

    .header-item a {
        color: white !important;

    }

</style>
