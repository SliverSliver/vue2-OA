<template>
    <div class="content">

        <Row>
            <Col>
                <h5>用户列表</h5>
            </Col>
            <Col>
                <v-table
                        is-horizontal-resize
                        style="width:100%"
                        :columns="columnss"
                        :table-data="tableData"
                        row-hover-color="#eee"
                        row-click-color="#edf7ff"
                        @on-custom-comp="customCompFunc"
                ></v-table>
            </Col>
        </Row>

    </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    data() {
      return {
        tableData: [],

        columnss: [
          {
            field: 'username',
            title: '姓名',
            width: 80,
            titleAlign: 'center',
            columnAlign: 'center',
            isResize: true,
          },
          {
            field: 'custome-adv',
            title: '操作',
            width: 200,
            titleAlign: 'center',
            columnAlign: 'center',
            componentName: 'user-operation',
            isResize: true,
          },
        ],
      };
    },
    components: {},
    methods: {
      customCompFunc(params) {
        console.log(params, 'param');
        this.$router.push({
          path: '/userInfo',
          name: '出勤记录',
          params: {
            data: params.rowData,
          },
        });
      },
    },
    created() {
      let that = this;

      this.$axiso.get('http://localhost:8081/admin/users', {
        headers: {
          'token': this.$store.getters.token,
        },
        withCredentials: true,
      }).then((response) => {
        if (response.data.code === 200) {
          let data = response.data;
          that.tableData = data.data;
        } else {
          this.$Message.error(response.data.msg);
        }
      }).catch((error) => {
        console.log(error);
      });

    },
  };

  // 自定义列组件
  Vue.component('user-operation', {
    template:
        `<span>
            <a href="" @click.stop.prevent="update(rowData,index)">查看信息</a>
            </span>`,
    props: {
      rowData: {
        type: Object,
      },
      field: {
        type: String,
      },
      index: {
        type: Number,
      },
    },
    methods: {
      update() {
        let params = {type: 'view', rowData: this.rowData, index: this.index};
        this.$emit('on-custom-comp', params);
      },
    },
  });
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style>
    .div {
        width: 220px;
        height: 44px;
        line-height: 44px;
        background: #1fa7c3;
        color: #fff;
        font-size: 17px;
        text-align: center;
        margin: 20px auto auto;
    }

    .mark1 {
        background-color: #00ee0c;
    }

    .mark2 {
        background-color: red;
    }

    .text-center {
        text-align: center
    }

    h3, h4, h5 {
        margin: 12px
    }

    h3 {
        margin-bottom: 20px
    }

    .state-info .panel .summary h3 {
        font-size: 200%;
        font-weight: 700;
        line-height: 20px;
        margin: 0
    }

    .page-heading h3 {
        color: #49586e;
        font-weight: 400;
        margin: 10px 0
    }

    @media screen and (max-width: 767px) {

    }

    .twt-info h3 {
        font-family: 'Open Sans', sans-serif;
        font-size: 16px;
        font-weight: 900;
        margin: 10px 0 30px 0;
        text-align: center
    }

</style>